const fs = require("fs");
const Crawler = require("crawler");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const url = "http://thanhnien.vn";
const titleString = "the-thao";

/// Get links
var links = [];

var linkCrawler = new Crawler({
  maxConnections    : 100,
  jQuery            : jsdom,
  callback          : function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      var dom = new JSDOM(res.body);
      var contents = dom.window.document.querySelectorAll(".clearfix a");

      /// Create list link paper
      for (var i = 0; i < contents.length; i++) {
        var href = contents[i].href.trim();
        // if (href.indexOf(titleString) !== -1) {
        //   links.push(`${url}${href}`);
        //   console.log(href);
        // }
        links.push(`${url}${href}`);
      }

      console.log(links.length);
    }
    c.queue(links);

    done();
  }
});
linkCrawler.queue(`${url}/${titleString}/`);

/// Save paper into file
var paperNo = 151;

var c = new Crawler({
    maxConnections : 1,
    jQuery         : jsdom,
    /// This will be called for each crawled page
    callback       : function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var dom = new JSDOM(res.body);
            var contents = dom.window.document.querySelectorAll("#abody div");

            /// Create paper
            var paper = [];
            for (var i = 0; i < contents.length; i++) {
              paper.push(contents[i].textContent.trim());
            }

            /// Write file
            if (paper.length > 0) {
              fs.writeFile(`${titleString}-${paperNo}.txt`, paper, "utf-8", (err) => {
                if (err) throw err;
              });
              paperNo++;
            }
        }
        done();
    }
});

// /// Remove file
// var links = [];
// for (var i = 60; i <= 110; i+=2) {
//   links.push(`./${titleString}-${i+1}.txt`);
//   // links.push(`./${titleString}-${i+2}.txt`);
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

// /// Rename file
// var links = [];
// var tmp = 61;
// for (var i = 62; i <= 110; i+=2) {
//   fs.rename(`./${titleString}-${i}.txt`, `./${titleString}-${tmp}.txt`, function(err) {
//     if ( err ) console.log('ERROR: ' + err);
//   });
//   tmp++;
// }
