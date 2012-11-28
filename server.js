const
express = require('express'),
helmet = require('helmet'),
routes = require('./routes'),
auth = require('./routes/auth'),
http = require('http'),
path = require('path');

var app = module.exports = express();

// Use the 'helmet' middleware to establish a Content Security Policy
// that allows javascript and frames only from the origins we specify.
helmet.csp.policy({
  defaultPolicy: {
    'default-src': ["'self'"],
    'frame-src': ["'self'", "https://login.persona.org"],
    'script-src': ["'self'", "https://login.persona.org", "https://ajax.googleapis.com"]
  }
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('view engine', 'jade');
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.compress());
  app.use(express.errorHandler());
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  // Security and security headers
  app.use(express.cookieParser(process.env.SECRET || "Attack at dawn!"));
  app.use(express.session({key: 'myapp', cookie: {maxAge: 60000}}));
  app.use(express.csrf());
  app.use(helmet.csp());
  app.use(helmet.xframe());
  app.use(helmet.contentTypeOptions());

  app.use(app.router);
});

// Our own middleware to inject the csrf token into each request
// as a variable called 'csrf_token'.
function csrf(req, res, next) {
  console.dir(req);
  res.locals.csrf_token = req.session._csrf;
  next();
}

// Routes for the paths we serve
app.get('/', csrf, routes.index);
app.get('/auth/status', csrf, auth.status);
app.post('/auth/login', csrf, auth.login);
app.post('/auth/logout', csrf, auth.logout);

// Do not run the server if we are being imported as a module.
if (!module.parent) {
  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });
}
