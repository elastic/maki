var spritezero = require('@elastic/spritezero');
var fs = require('fs');
var glob = require('glob');
var path = require('path');
var mkdirp = require('mkdirp');
var gatherFiles = require('./gather-files');

mkdirp.sync(path.resolve(path.join(__dirname, '../dist')));

fs.writeFileSync(
  './dist/svgicons.json',
  JSON.stringify(gatherFiles(path.join(__dirname, '../icons')))
);

[1, 2, 4].forEach(function(pxRatio) {
  var svgs = glob
    .sync(path.resolve(path.join(__dirname, '../icons/*.svg')))
    .map(function(f) {
      return {
        svg: fs.readFileSync(f),
        id: path.basename(f).replace('.svg', '')
      };
    });
  var pngPath = path.resolve(
    path.join(__dirname, '../dist/sprite@' + pxRatio + '.png')
  );
  var jsonPath = path.resolve(
    path.join(__dirname, '../dist/sprite@' + pxRatio + '.json')
  );

  // Pass `true` in the layout parameter to generate a data layout
  // suitable for exporting to a JSON sprite manifest file.
  spritezero.generateLayout(
    { imgs: svgs, pixelRatio: pxRatio, format: true, sdf: true },
    function(err, dataLayout) {
      if (err) return;
      fs.writeFileSync(jsonPath, JSON.stringify(dataLayout));
    }
  );

  // Pass `false` in the layout parameter to generate an image layout
  // suitable for exporting to a PNG sprite image file.
  spritezero.generateLayout(
    { imgs: svgs, pixelRatio: pxRatio, format: false, sdf: true },
    function(err, imageLayout) {
      spritezero.generateImage(imageLayout, function(err, image) {
        if (err) return;
        fs.writeFileSync(pngPath, image);
      });
    }
  );
});
