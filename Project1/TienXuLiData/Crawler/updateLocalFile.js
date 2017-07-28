const fs = require('fs');
const titleString = "y-te";
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// /// Remove file
// var removeFile = function() {
//   var links = [];
//   for (var i = 60; i <= 110; i+=2) {
//     links.push(`./${titleString}-${i+1}.txt`);
//     // links.push(`./${titleString}-${i+2}.txt`);
//   }
//
//   console.log(links);
//
//   for (var i = 0; i < links.length; i++) {
//     fs.unlink(links[i], (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(`successfully ${i}`);
//       }
//     });
//   }
// }
//
// /// Rename file
// var renameFlie = function() {
//   var links = [];
//   var tmp = 61;
//   for (var i = 62; i <= 110; i+=2) {
//     fs.rename(`./${titleString}-${i}.txt`, `./${titleString}-${tmp}.txt`, function(err) {
//       if ( err ) console.log('ERROR: ' + err);
//     });
//     tmp++;
//   }
// }
//
// module.exports = {
//   removeFile,
//   renameFlie
// }
// var filename = `./${titleString}-1.txt`;


// var convertFile = function(i) {
//   var filename = `./${titleString}-${i}.txt`;
//   console.log(filename);
//
//   fs.readFile(filename, 'utf-8', function(err, data) {
//     if (err) {
//       console.log("ERROR:" + err);
//     } else {
//       var components = data.split(". ");
//       var paper = "";
//       for (var j = 0; j < components.length; j++) {
//         paper += `${components[j].trim()}\n`;
//       }
//       console.log(paper);
//
//       fs.writeFile(`yte-${i}.txt`, paper, 'utf-8', (err) => {
//         if (err) {
//           console.log("ERROR:" + err);
//         } else {
//           console.log('file saved');
//         }
//       });
//     }
//   });
// }


var charecterError = [];
charecterError.push(",/,", "./.", "-/-", ";/;", ":/:", ".../...", ""/"", "?/?", `”/N`, `"/A`);

var standardized = function(i) {
  var filename = `./${titleString}-${i}.txt`;

  fs.readFile(filename, 'utf-8', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var components = data.split(" ");
      var paper = "";

      /// Remove
      for (var j = 0; j < components.length-1; j++) {
        for (charecter of charecterError) {
          if (components[j] == charecter) {
            components.splice(j, 1);
            break;
          }
        }
      }

      /// Create paper
      for (string of components) {
        paper += string + " ";
      }

      /// Save file
      fs.writeFile(`yte-${i-1}.txt`, paper, 'utf-8', (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('file saved');
        }
      });
    }
  });
}


for (var i = 2; i <= 249; i++) {
  standardized(i);
}
