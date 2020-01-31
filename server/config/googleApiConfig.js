const { google } = require('googleapis');

// Google Configuration
const config = {
	clientId: '1065630248140-cgve37pslutdaccl5m9bfpsi7fi2u30j.apps.googleusercontent.com',
	clientSecret: '2FfcKa258s3hGctTJoC_Mdrx',
	redirect: 'http://localhost:3000/auth/auth-google'
};

// Create Connection
function createConnection() {
  return new google.auth.OAuth2(
    config.clientId,
    config.clientSecret,
    config.redirect
  );
}

// Set Default Scope
const scopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtube.force-ssl'
];

// After, Connection Established then get connection Url.
function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent', // added new refresh token when sign In
    scope: scopes
  });
}

// Url sent to the client
function googleUrl() {
  const auth = createConnection();
  const url = getConnectionUrl(auth);
  return url;
}

function getGooglePeopleApi(auth) {
  return google.people({ version: 'v1', auth });
} 

async function getGoogleAccountFromCode(code) {
  const auth = createConnection();
  const data = await auth.getToken(code);
  const tokens = data.tokens;
  auth.setCredentials(tokens);
  const people = getGooglePeopleApi(auth);
  const fields = [
    "names",
    "emailAddresses",
    "photos"
  ];
  const me = await people.people.get({
    resourceName: 'people/me',
    personFields: fields.join(',')
  });
  const userId = me.data.resourceName;
  const fullName = me.data.names[0].displayName;
  const email = me.data.emailAddresses && me.data.emailAddresses.length && me.data.emailAddresses[0].value;

  return {
    id: userId,
    name: fullName,
    email: email,
    token: tokens,
  };
}

async function authenticate(req, res, next) {
  const auth = createConnection();
  const authHeader = req.headers.authorization.split('Bearer ');
  const token = authHeader[1];
  try {
    await auth.getTokenInfo(token);
    next();
  } catch (err) {
    res.send({
      status: err.response.status,
      statusText: err.response.statusText,
      response: err.response.data.error
    });
  }
}

module.exports = {
  googleAuth: googleUrl,
  getData: getGoogleAccountFromCode,
  verify: authenticate
}