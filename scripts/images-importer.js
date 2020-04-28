const findInFiles = require("find-in-files");
const path = require('path');

findInFiles
  .find(new RegExp("https?:\\/\\/(www)?.belighted.com/.+\\.(png|jpg|svg|jpeg|webp)+"), path.join(__dirname, '..', 'content'), ".(mdx*|yml)$")
  .then(function(results) {
    console.log('done')
    for (var result in results) {
      var res = results[result];
      console.log(
        'found "' +
          res.matches[0] +
          '" ' +
          res.count +
          ' times in "' +
          result +
          '"'
      );
    }
  }).catch(e=>console.error(e));
