const request = require('request');
const Chat = require('./chats.server.model');

const saveChats = (chatId, token) => {
  // console.log('inside chats', chatId, token);
  request({
    headers: {
      'authorization': token
    },
    uri: `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${chatId}&part=id,snippet,authorDetails&maxResults=500`,
    method: 'GET'
  }, async (err, res, body) => {
    // console.log(body, 'bodybodybody');  
    const items = JSON.parse(body).items;
    for (let item of items) {
      const id = item.id;
      const sender = item.authorDetails.displayName;
      const msg = item.snippet.displayMessage;
      // Save Chat into DB
      const chats = new Chat({
        chatId: chatId,
        itemId: id,
        sender: sender,
        message: msg,
        publishedAt: item.snippet.publishedAt
      });
      chats.save().then(item => {
        return item;
      }).catch(err => {
      });
    }
  });
}


const getChats = async (id) => {
  // ChatID
  const chats = await Chat.find({ chatId: id });
  return chats;
};

module.exports = {
  getChats,
  chats: saveChats
}