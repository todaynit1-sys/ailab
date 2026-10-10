const fs = require('node:fs/promises');
const path = require('node:path');

// Deploy only files referenced by the two public pages.
async function build() {
  const root = __dirname;
  const output = path.join(root, 'dist');
  if (path.dirname(output) !== root || path.basename(output) !== 'dist') {
    throw new Error('Unexpected output directory');
  }
  await fs.rm(output, { recursive: true, force: true });
  await fs.mkdir(output, { recursive: true });
  const files = new Set(['index.html', 'brand.html', 'styles.css', 'app.js']);
  for (const page of ['index.html', 'brand.html']) {
    const source = await fs.readFile(path.join(root, page), 'utf8');
    for (const match of source.matchAll(/(?:src|href)="(assets\/[^"?#]+)"/g)) {
      files.add(match[1]);
    }
  }
  for (const file of files) {
    const source = path.resolve(root, file);
    if (!source.startsWith(root + path.sep)) throw new Error('Invalid public file');
    const destination = path.join(output, file);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.copyFile(source, destination);
  }
  await fs.writeFile(path.join(output, '_headers'), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Cache-Control: public, max-age=0, must-revalidate
`);
  console.log(`Static site ready: ${files.size} public files in dist/`);
}
build().catch(error => { console.error(error.message); process.exitCode = 1; });
