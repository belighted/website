const findInFiles = require("find-in-files");
const path = require('path');

findInFiles
  .find(new RegExp("https?:\\/\\/(www)?.belighted.com/.+\\.(png|jpg|svg|jpeg|webp)+"), path.join(__dirname, '..', 'content'), ".(mdx*|yml)$")
  .then(function(results) {
    console.log('done', Object.keys(results));
    Object.keys(results).forEach(key=>{
      const result = results[key];
      console.log(
        'found "' +
        result.matches[0] +
        '" ' +
        result.count +
        ' times in "' +
        key +
        '"'
      );
    })
  }).catch(e=>console.error(e));
