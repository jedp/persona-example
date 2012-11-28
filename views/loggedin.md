##What Happened

The `onlogin` callback that you specified in `navigator.id.watch` has
been called with an identity *assertion*.  Your server has verified that
the assertion is valid and taken steps to log the user in.

What is an assertion?  It's a cryptographic claim that someone owns a
given email address.  With Persona, we don't deal with passwords.
Instead, when someone tries to log into your site, you will be
presented with an assertion of their identity.  This is a
cryptographic bundle of their email address and a few other things,
signed by the *identity provider* that has vouched for the user.

This assertion can be used to prove whether or not the user is who
they say they are.  All you do is send the assertion to the verifier
service at `persona.org`.  The verifier will tell you whether
assertion is good or bad.  Basically, the verifier is going to get the
identity provider's public key, ensure that it really did sign the
assertion, and check that the contents are valid.

