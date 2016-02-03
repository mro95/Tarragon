var through = require('through2');
var gutil = require('gulp-util');
//var dom = require('node-dom').dom;
var PluginError = gutil.PluginError;

// Consts
const PLUGIN_NAME = 'tarragon';

var tarragon = function(contents) {

    console.log(contents);
};

// Plugin level function(dealing with files)
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
