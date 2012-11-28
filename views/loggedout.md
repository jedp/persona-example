##What Happened

The user was logged out by the `navigator.id.logout()` function.  This
called your `onlogout` callback, which told your server to log the
user out.

Here you do what you would normally do when a user logs out: Destroy
sessions, redirect to logout pages, etc.