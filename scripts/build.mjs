import { mkdir, copyFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
await mkdir(new URL('dist/', root), { recursive: true });
for (const file of ['index.html', 'app.js', 'styles.css', 'staff-data.js']) {
  await copyFile(new URL(`public/${file}`, root), new URL(`dist/${file}`, root));
}
console.log('Static website built in dist/');
