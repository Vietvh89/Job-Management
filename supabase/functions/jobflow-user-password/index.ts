import { createClient } from "npm:@supabase/supabase-js@2.116.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, "Content-Type": "application/json" },
});

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);

  try {
    const url = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const authorization = request.headers.get("Authorization") || "";
    if (!url || !anonKey || !serviceKey || !authorization.startsWith("Bearer ")) {
      return json({ error: "Authentication is required." }, 401);
    }

    const token = authorization.slice(7);
    const caller = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: authorization } },
    });
    const { data: userData, error: userError } = await caller.auth.getUser(token);
    if (userError || !userData.user) return json({ error: "Session is invalid or expired." }, 401);

    const { data: access, error: accessError } = await caller.rpc("jobflow_access", { action: "status", args: {} });
    if (accessError || access?.role !== "admin" || access?.email !== userData.user.email?.toLowerCase()) {
      return json({ error: "Only Account Owners can manage login passwords." }, 403);
    }

    const { email, password } = await request.json();
    const targetEmail = String(email || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(targetEmail)) return json({ error: "Set a valid Staff email first." }, 400);
    if (typeof password !== "string" || password.length < 8 || password.length > 72) {
      return json({ error: "Password must contain between 8 and 72 characters." }, 400);
    }

    const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: member, error: memberError } = await admin
      .from("jobflow_members")
      .select("email,status,staff_id")
      .eq("email", targetEmail)
      .maybeSingle();
    if (memberError) throw memberError;
    if (!member || member.status !== "active" || !member.staff_id) {
      return json({ error: "This Staff email has not been granted active application access." }, 400);
    }

    let targetUser;
    for (let page = 1; page <= 50 && !targetUser; page += 1) {
      const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
      if (error) throw error;
      targetUser = data.users.find((user) => user.email?.toLowerCase() === targetEmail);
      if (data.users.length < 200) break;
    }

    if (targetUser) {
      const { error } = await admin.auth.admin.updateUserById(targetUser.id, { password });
      if (error) throw error;
      return json({ ok: true, action: "updated" });
    }

    const { error } = await admin.auth.admin.createUser({ email: targetEmail, password, email_confirm: true });
    if (error) throw error;
    return json({ ok: true, action: "created" });
  } catch (error) {
    console.error("Password administration failed", error instanceof Error ? error.message : "Unknown error");
    return json({ error: "The login password could not be updated." }, 500);
  }
});
