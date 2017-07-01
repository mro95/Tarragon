var through = require('through2');
var gutil = require('gulp-util');
var cheerio = require('cheerio');
var PluginError = gutil.PluginError;
var fetch = require('node-fetch');

// Consts
const PLUGIN_NAME = 'tarragon';

var tarragon = function(contents) {
    var $ = cheerio.load(contents);
    var elems = $('link[type="text/data"]');
    Array.prototype.forEach.call(elems, function(elem) {
        console.log($(elem).attr('href'));
        fetch('./'+$(elem).attr('href'))
        .then(function(response) {
            return response.json()
        }).then(function(data) {
            console.log('parsed json', data);

            for (selector in data) {
                var body = data[selector];
                $(selector).innerHTML = body;
            }
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        })
    });
};

module.exports = function() {
    console.log('starting tarragon... #debug message');

    return through.obj(function(file, enc, cb) {
      if (file.isStream()) {
        return cb(new PluginError('tarragon', 'Streaming not supported'));
      }
      if (file.isNull()) {
        return cb(null, file);
      }
      if (file.isBuffer()) {
          var contents = String(file.contents);
          tarragon(contents);
      }

      cb(null, file);
    });
};
