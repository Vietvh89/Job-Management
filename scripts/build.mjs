import { mkdir, copyFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
await mkdir(new URL('dist/', root), { recursive: true });
await mkdir(new URL('public/vendor/', root), { recursive: true });
await copyFile(new URL('node_modules/@supabase/supabase-js/dist/umd/supabase.js',root),new URL('public/vendor/supabase.js',root));
await mkdir(new URL('dist/vendor/', root), { recursive: true });
for (const file of ['index.html', 'app.js', 'styles.css', 'staff-data.js','cloud.js','cloud.css','cloud-config.js','vendor/supabase.js']) {
  await copyFile(new URL(`public/${file}`, root), new URL(`dist/${file}`, root));
}
console.log('Static website built in dist/');
