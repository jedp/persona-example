##What Happened

The `navigator.id.request()` function was called, which tells Persona
that you want to get the user's identity.  The user interacted with the 
Persona interface, chose an identity, and authenticated with his or her
identity provider.  Persona then generated an identity *assertion* and
passed it to your `onlogin` callback.  That's the callback you specified
in `navigator.id.watch()`.

Your `onlogin` callback sends the assertion down to your server, which
verifies that it is valid.  Fortunately, Persona provides a verifier
service, so all you have to do is have your server confirm with the
verifier that the assertion is valid.  Having determined that the
assertion was valid (not expired, forged, etc.), the verifier gives
you the thumbs-up and you can log the user into your site.

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

