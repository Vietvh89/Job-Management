import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
const root = new URL('../public/', import.meta.url);
const types = { 'index.html': 'text/html; charset=utf-8', 'app.js': 'text/javascript; charset=utf-8', 'staff-data.js': 'text/javascript; charset=utf-8', 'styles.css': 'text/css; charset=utf-8', 'cloud.js':'text/javascript; charset=utf-8', 'cloud-config.js':'text/javascript; charset=utf-8', 'cloud.css':'text/css; charset=utf-8', 'vendor/supabase.js':'text/javascript; charset=utf-8' };
const port = Number(process.env.PORT || 3000);
createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
  const path = new URL(req.url, 'http://localhost').pathname;
  const name = path === '/' ? 'index.html' : path.slice(1);
  if (!Object.hasOwn(types, name)) { res.writeHead(404); res.end('Not found'); return; }
  try {
    const body = await readFile(new URL(name, root));
    res.writeHead(200, { 'Content-Type': types[name], 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(500); res.end('Cannot read asset'); }
}).listen(port, '127.0.0.1', () => console.log(`JobFlow: http://localhost:${port}`));
