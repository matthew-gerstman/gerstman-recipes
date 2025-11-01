import { build } from 'bun';

const result = await build({
  entrypoints: ['./src/main.tsx'],
  outdir: './dist',
  target: 'browser',
  minify: true,
  splitting: true,
  sourcemap: 'external',
  naming: {
    entry: '[dir]/[name].[ext]',
    chunk: '[name]-[hash].[ext]',
    asset: '[name]-[hash].[ext]',
  },
});

if (!result.success) {
  console.error('Build failed');
  process.exit(1);
}

// Copy index.html
const html = await Bun.file('index.html').text();
await Bun.write('dist/index.html', html);

// Create 404.html for GitHub Pages SPA routing
await Bun.write('dist/404.html', html);

console.log('✓ Build completed successfully');
