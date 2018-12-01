const { FuseBox, WebIndexPlugin, CSSPlugin, SassPlugin, QuantumPlugin } = require('fuse-box');

const isProduction = process.env.NODE_ENV === 'production';
console.log(`Production: ${isProduction}`);

const fuse = FuseBox.init({
  homeDir: './',
  target: 'browser',
  output: 'dist/$name.js',
  tsConfig: 'tsconfig.json',
  sourceMaps: true,
  plugins: [
    WebIndexPlugin({ template: './common/index.html' }),
    [SassPlugin(), CSSPlugin()]
    // isProduction &&
    // QuantumPlugin({
    // sourceMaps: {
    //   path: '/'
    // },
    // bakeApiIntoBundle: true
    // containedAPI: true,
    // removeExportsInterop: false,
    // uglify: false,
    // treeshake: true
    // })
  ]
});

if (!isProduction) {
  fuse.dev(); // launch http server
}

const app = fuse.bundle('app');

if (!isProduction) {
  app.hmr({ reload: true }).watch();
}

app.instructions(' > ./total/index.tsx');

fuse.run();
