const path = require('path');

module.exports = {
  layouts: {
    all: require('./layouts/all.json')
  },
  svgArray: require('./dist/svgicons.json'),
  spritesheet: {
    1: require('./dist/sprite@1.json'),
    2: require('./dist/sprite@2.json'),
    4: require('./dist/sprite@4.json')
  }
};
