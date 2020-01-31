const request = require('request');
const Session = require('../sessions/session.server.model');
const chats = require('../chats/chats.server');

const getsessionWithKeyword = async (req, res) => {
  console.log('Session Search', req.params);
  const chatId = await Session.find({ userId:  req.params.userId })
    .select({ chatId: 1 } );
    console.log(chatId, 'chatIdchatIdchatIdchatId');
  // Search Functionality
  // res.send(req.params);
}

const broadcastDetails = (req, res) => {
  const userInfo = req.body;
  const response = res;
  const token = req.headers.authorization;
  request({
    headers: {
      'authorization': token
    },
    uri: `https://www.googleapis.com/youtube/v3/liveBroadcasts?part=id,snippet,contentDetails&id=${userInfo.link}&maxResults=50`,
    method: 'GET'
  }, (err, res, body) => {

    // console.log(body, 'body111111111');
    // Save Broadcast
    const item = JSON.parse(body).items[0];
    const sessionDetail = {
      userId: userInfo.userId,
      url: `https://www.youtube.com/watch?v=${userInfo.link}`,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnails: item.snippet.thumbnails,
      name: userInfo.name,
      email: userInfo.email,
      keyWord: userInfo.keyword,
      chatId: item.snippet.liveChatId,
      createdAt: new Date()
    }
    const session = new Session(sessionDetail);
    session.save()
      .then(async item => {
        const liveChatID = item.chatId;
        // Save Chats
        console.log(token, '134214343');
         await chats.chats(liveChatID, token);
         response.send({ chatId: liveChatID});
      })
      .catch(err => {
        console.log(err);
      });
  });
};

module.exports = {
  broadcast: broadcastDetails,
  search: getsessionWithKeyword
}