import { build } from 'bun';

const result = await build({
  entrypoints: ['./src/main.tsx'],
  outdir: './dist',
  target: 'browser',
  minify: true,
  splitting: true,
  sourcemap: 'external',
});

if (!result.success) {
  console.error('Build failed');
  process.exit(1);
}

// Copy index.html and update script path
const html = await Bun.file('index.html').text();
const distHtml = html.replace('/src/main.tsx', '/main.js');
await Bun.write('dist/index.html', distHtml);

// Create 404.html for GitHub Pages SPA routing
await Bun.write('dist/404.html', distHtml);

console.log('✓ Build completed successfully');
