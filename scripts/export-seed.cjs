// Generate normalized initial data, before the regression harness mutates it.
const fs = require('node:fs');
const harness = fs.readFileSync('tests/audit.cjs','utf8').split('const a=sandbox.audit;')[0];
eval(harness + ';fs.writeFileSync("supabase/seed.json",JSON.stringify(sandbox.audit.state));');
