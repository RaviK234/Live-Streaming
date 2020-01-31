// const router = require('express').Router();
// const request = require('request');

// // Get Details from given Youtube Stream ID
// router.get('/video/:id', (req, res) => {
//   console.log('Inside Router');
//   const link = req.params.id;
//   console.log(req.headers);
//   const token = req.headers.authorization
//   request({
//     headers: {
//       'authorization': token
//     },
//     uri: `https://www.googleapis.com/youtube/v3/liveBroadcasts?part=id,snippet,contentDetails&id=${link}`,
//     method: 'GET'
//   }, (err, res, body) => {
//     console.log('Response from Google APi: ',body);
    
//   });
// });

// module.exports = router;