#Powered By Persona

This web site authenticates users using Mozilla Persona.

##Why use Persona?

Users like it because it is simple and secure.

Developers like it for the same reasons.

It is simple because it does away with passwords.  This is good for
users because they don't have to remember (or forget) passwords for
every site they log into.  It's good for developers because they don't
have to worry about password management and storage.  Also, since the
user's identity is just an email address and there are no special
tokens, there's no lock-in.

##How Do You Do It?

Full instructions are in the [Quick Setup
Guide](https://developer.mozilla.org/en-US/docs/Persona/Quick_Setup).

In a nutshell, there are three things you do.

First, you include a bit of javascript from `https://login.persona.org/include.js`.

Yay.  Second, you call `navigator.id.watch` and give it some callbacks
and optionally a `loggedInUser` parameter (indicating who your site
thinks is logged in right now):

```
navigator.id.watch({
  loggedInUser: #{ whoYouExpectIsLoggedin },
  onlogin: function(assertion) {
    if (isValid(assertion)) {
      logTheUserIn();
    }
  },
  onlogout: function() {
    logTheUserOut();
  }
});
```

Finally, you hook up your login and logout buttons to
`navigator.id.request()` and `navigator.id.logout()` respectively.

```
$("#loginButton").click(function() { navigator.id.request() });
$("#logoutButton").click(function() { navigator.id.logout() });
```

And done.

Click the signin button above to give it a try!

##Troubleshooting

### Error: "Audience mismatch: domain mismatch"

If you get this error, Persona is saying that the audience for the assertion is
different from the domain your server is running on. Be sure you are running
your server on `127.0.0.1`, not `localhost`.  

