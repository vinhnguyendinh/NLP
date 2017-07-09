const fs = require("fs");
const Crawler = require("crawler");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const url = "http://www.24h.com.vn";

/// Get links
var links = [];

var linkCrawler = new Crawler({
  maxConnections    : 1,
  jQuery            : jsdom,
  callback          : function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      var dom = new JSDOM(res.body);
      var contents = dom.window.document.querySelectorAll(".boxDoi-sub-Item-trangtrong a");
      console.log(contents.length);
      /// Create list link paper
      for (var i = 0; i < contents.length; i++) {
        var href = contents[i].href.trim();
        console.log(href);
        links.push(`${url}${href}`);
      }
    }

    c.queue(links);

    done();
  }
});
linkCrawler.queue(`${url}/the-thao-c101.html`);

/// Save paper into file
var paperNo = 128;

var c = new Crawler({
    maxConnections : 1,
    jQuery         : jsdom,
    /// This will be called for each crawled page
    callback       : function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var dom = new JSDOM(res.body);
            var contents = dom.window.document.querySelectorAll(".text-conent p");

            /// Create paper
            var paper = [];
            for (var i = 0; i < contents.length; i++) {
              paper.push(contents[i].textContent);
            }

            /// Write file
            if (paper.length > 0) {
              fs.writeFile(`the-thao-${paperNo}.txt`, paper, "utf-8", (err) => {
                if (err) throw err;
              });
              paperNo++;
            }
        }
        done();
    }
});

/// Remove file
// var links = [];
// for (var i = 128; i <= 195; i+=3) {
//   links.push(`./the-thao-${i+1}.txt`);
//   links.push(`./the-thao-${i+2}.txt`);
// }
//
// console.log(links);
//
// for (var i = 0; i < links.length; i++) {
//   fs.unlink(links[i], (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(`successfully ${i}`);
//     }
//   });
// }

/// Rename file
// var links = [];
// var tmp = 129;
// for (var i = 131; i <= 194; i+=3) {
//   fs.rename(`./the-thao-${i}.txt`, `./the-thao-${tmp}.txt`, function(err) {
//     if ( err ) console.log('ERROR: ' + err);
//   });
//   tmp++;
// }
