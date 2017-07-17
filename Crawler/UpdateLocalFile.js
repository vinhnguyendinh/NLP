const fs = require('fs');
const titleString = "the-thao";

/// Remove file
var removeFile = function() {
  var links = [];
  for (var i = 60; i <= 110; i+=2) {
    links.push(`./${titleString}-${i+1}.txt`);
    // links.push(`./${titleString}-${i+2}.txt`);
  }

  console.log(links);

  for (var i = 0; i < links.length; i++) {
    fs.unlink(links[i], (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`successfully ${i}`);
      }
    });
  }
}

/// Rename file
var renameFlie = function() {
  var links = [];
  var tmp = 61;
  for (var i = 62; i <= 110; i+=2) {
    fs.rename(`./${titleString}-${i}.txt`, `./${titleString}-${tmp}.txt`, function(err) {
      if ( err ) console.log('ERROR: ' + err);
    });
    tmp++;
  }
}

module.exports = {
  removeFile,
  renameFlie
}
