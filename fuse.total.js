const { FuseBox, WebIndexPlugin, CSSPlugin, SassPlugin, QuantumPlugin } = require('fuse-box');

const isProduction = process.env.NODE_ENV === 'production';
console.log(`Production: ${isProduction}`);

const fuse = FuseBox.init({
  homeDir: './',
  target: 'browser@es5',
  output: 'dist/$name.js',
  tsConfig: 'tsconfig.json',
  sourceMaps: !isProduction,
  plugins: [
    WebIndexPlugin({ template: './common/index.html' }),
    [SassPlugin(), CSSPlugin()],
    isProduction && QuantumPlugin({ css: true })
  ]
});

if (!isProduction) {
  fuse.dev(); // launch http server
}

fuse
  .bundle('app')
  .instructions(' > ./total/index.tsx')
  .hmr({ reload: true })
  .watch();

if (!isProduction) {
  // fuse.watch();
}

fuse.run();
