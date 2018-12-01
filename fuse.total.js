const { FuseBox, WebIndexPlugin } = require('fuse-box');
const fuse = FuseBox.init({
  homeDir: './',
  target: 'browser@es6',
  output: 'dist/$name.js',
  tsConfig: 'tsconfig.json',
  sourceMaps: true,
  plugins: [WebIndexPlugin({ template: './common/index.html' })]
});
fuse.dev(); // launch http server
fuse
  .bundle('app')
  .instructions(' > ./total/src/index.tsx')
  .hmr({ reload: true })
  .watch();
fuse.run();
