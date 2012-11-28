##What Happened

The user was logged out by the `navigator.id.logout()` function.  This
called your `onlogout` callback, which told your server to log the
user out.

Here you do what you would normally do when a user logs out: Destroy
sessions, redirect to logout pages, etc.

##What Next?

Refresh this page to read from the beginning again, or add Persona to your own site.

- [Developer Documents](https://developer.mozilla.org/en-US/docs/Persona)
- [This Site, Which You Can Steal All You Want From](https://github.com/jedp/persona-example)