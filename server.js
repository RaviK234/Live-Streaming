require('./server/config/db');

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

// Cross Origin Middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Static files and directories
app.use(express.static('client'));

// Body Parser
app.use(bodyParser.json({ limit: '50mb', defer: true }));

// Session Management Middleware
app.use(session({
  secret: 'Hello',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// static files shared
function defaultStatic(req, res) {
  res.sendFile('index.html', { root: `${__dirname}/client/` });
}

// Default Client Routes
app.get('/auth', defaultStatic);
app.get('/auth/login', defaultStatic);
app.get('/live/', defaultStatic);
app.get('/auth/auth-google', defaultStatic);

// Default Server Routes
require('./server/routes')(app);

// Listen in port no 3000
const server = app.listen(3000, () => {
  console.log('Server Running in http://localhost:3000');
});

const serverSocketIo = require('./socket')(server);
require('./server/sockets/comments.server')(serverSocketIo);