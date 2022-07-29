'use stric';

var fs = require('fs');
var obj;

fs.readFile('file', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});

function isString(val) {
  return Object.prototype.toString.call(val) === "[object String]"
}