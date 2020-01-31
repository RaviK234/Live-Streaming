const router = require('express').Router();
const googleAuth = require('./config/googleApiConfig');
const sessions = require('./sessions/session.server.route');

module.exports = (app) => {
  app.get('/url', (req, res) => {
    res.json(googleAuth.googleAuth());
  });
  app.use('/auth', [
    router.get('/google-auth', async (req, res) => {
      try {
        const data = await googleAuth.getData(req.query.code);
        res.send(data);
      } catch (error) {
        console.log(error)
      } 
    })
  ]);
  app.use('/v1', googleAuth.verify,[
    sessions
  ]);
}