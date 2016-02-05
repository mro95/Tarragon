var fs = require('fs');
var jsdom = require('jsdom');
// TODO: callbackify this to make it more error prone
// TODO: validate and check arguments

var contents = '';

if(process.argv[2]) {
    contents = fs.readFileSync(process.argv[2], 'utf8');
    parse(contents);
}
process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
    var chunk = process.stdin.read();
    if (chunk !== null) {
        contents += chunk.toString();
    }
});

process.stdin.on('end', () => {
    parse(contents)
});

function parse(contents) {
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

      var node = document.doctype;
      var doctype = "<!DOCTYPE "
               + node.name
               + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '')
               + (!node.publicId && node.systemId ? ' SYSTEM' : '') 
               + (node.systemId ? ' "' + node.systemId + '"' : '')
               + '>';

      console.log(doctype);
      console.log(document.documentElement.outerHTML);
    });
}
