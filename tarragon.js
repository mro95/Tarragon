var fs = require('fs');
var jsdom = require('jsdom');
// TODO: callbackify this to make it more error prone
// TODO: validate and check arguments
var contents = fs.readFileSync(process.argv[2], 'utf8');

// TODO: figure out a better way to dump html
// (preferably with doctype)
jsdom.env(contents, function (err, window) {
  var document = window.document;

  var $ = document.querySelector.bind(document);
  var $$ = document.querySelectorAll.bind(document);
  var elems = $$('link[type="text/data"]');

  Array.prototype.forEach.call(elems, function(elem) {
    // TODO: callbackify this to make it more error prone
    var data = JSON.parse(fs.readFileSync(elem.href, 'utf-8'));

    for (selector in data) {
      var body = data[selector];
      $(selector).innerHTML = body;
    }
  });

  console.log(document.documentElement.outerHTML);
});
