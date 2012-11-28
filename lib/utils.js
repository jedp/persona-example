function decode(s) {
  return JSON.parse( (new Buffer(s, 'base64')).toString() );
}

var unpackAssertion = module.exports.unpackAssertion = function unpackAssertion(assertion) {
  var parts = assertion.split('.');

  var header = decode(parts[0]);
  var claim = decode(parts[1]);
  var payload = decode(parts[3]);

  var contents = {
    algorithm: header.alg,
    audience: payload.aud,
    issuer: claim.iss,
    issued_at: claim.iat,
    expiration: claim.exp,
  };

  if (typeof claim.principal !== 'undefined') {
    contents.principal_email = claim.principal.email;
    contents.principal_host = claim.principal.host;
  }

  if (typeof claim['public-key'] !== 'undefined') {
    contents.pk_algorithm = claim['public-key'].algorithm;
  }

  return contents;
};