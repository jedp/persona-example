const
path = require('path'),
fs = require('fs');

function decode(s) {
  return JSON.parse( (new Buffer(s, 'base64')).toString() );
}

var unpackAssertion = module.exports.unpackAssertion = function unpackAssertion(assertion) {
  var parts = assertion.split('.');

  return {
    header: decode(parts[0]),
    claim: decode(parts[1]),
    payload: decode(parts[3])
  };
};

var getContent = module.exports.getContent = function getContent(name) {
  return fs.readFileSync(path.join(__dirname, '..', 'views', name+'.md')).toString();
};