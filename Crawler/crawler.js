const fs = require("fs");
const Crawler = require("crawler");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const url = "http://laodong.com.vn";
const titleString = "giao-duc";

/// Get pages
var pages = [];
for (var i = 24; i <= 26; i++) {
  pages.push(`${url}/${titleString}/?trang=${i}`);
}

/// Get links

var linkCrawler = new Crawler({
  maxConnections    : 1,
  jQuery            : jsdom,
  callback          : function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      var dom = new JSDOM(res.body);
      var contents = dom.window.document.querySelectorAll(".feature .cover a");

      /// Create list link paper
      var check = [];
      var links = [];

      for (var i = 0; i < contents.length; i++) {
        var href = contents[i].href.trim();
        // if (href.indexOf(titleString) !== -1) {
          links.push(`${url}${href}`);
          check.push(0);
        // }
      }

      /// Remove same link
      for (var i = 0; i < links.length; i++) {
        if (check[i] == 0) {
          for (var j = i+1; j < links.length; j++) {
            if (links[i] == links[j]) {
              check[j] = -1;
            }
          }
        }
      }

      for (var i = 0; i < check.length; i++) {
        if (check[i] == -1) {
          links.remove(i);
        }
      }

      c.queue(links);
    }

    done();
  }
});
linkCrawler.queue(pages);

/// Save paper into file
var paperNo = 219;

var c = new Crawler({
    maxConnections : 100,
    jQuery         : jsdom,
    /// This will be called for each crawled page
    callback       : function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var dom = new JSDOM(res.body);

            var paper = "";

            /// Title
            let title = dom.window.document.querySelector(".cms-title");
            if (title.textContent.trim().length > 0) {
              paper += `${title.textContent.trim()}.\n`;
            }

            let desc = dom.window.document.querySelector(".cms-desc");
            if (desc.textContent.trim().length > 0) {
              paper += `${desc.textContent.trim()}`;
            }

            /// Content
            var contents = dom.window.document.querySelectorAll(".cms-body p");
            /// Create paper
            for (var i = 0; i < contents.length; i++) {
              if (contents[i].textContent.trim().length > 0) {
                paper += " " + contents[i].textContent.trim();
              }
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
