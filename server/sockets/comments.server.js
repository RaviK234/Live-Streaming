const liveChat = require('../chats/chats.server');
const cron = require('node-cron');

module.exports = (socketIo) => {
  let interval;
  socketIo.on('connection', (socket) => {
    let previousSessionId;

    const safeJoin = currentSessionId => {
      socket.leave(previousSessionId);
      socket.join(currentSessionId);
      previousSessionId = currentSessionId;
    };

    socket.on("read", async key => {
      // console.log('Read: ', key);
      safeJoin(key);
      await chats(socket, key);
    });
  });

  async function chats(socket, object) {
    console.log('Socket Start');
    let data = [];
    stopInterval();
    let chatLen = 0;
    let count = 0;
    // SetInterval
    interval = setInterval(async () => {
      // Save Chat
      await liveChat.chats(object.chatId, 'Bearer ' + object.token.access_token);
      // Get Chat
      const chat = await liveChat.getChats(object.chatId);  // 5
      
      for (var i = data.length; i < chat.length; i++) {
        const msg = chat[i].message;
        console.log('iterate: ', i);
        if (object.keyword.length != 0) {
          for (let keywords of object.keyword) {
            if ((new RegExp(keywords.toLowerCase())).test(msg.toLowerCase())) {
              socket.emit('write', chat[i]);
            }
          }
        } else {
          socket.emit('write', chat[i]);
        }
        data.push(chat[i]);
      }
      console.log('Chats length: ', chat.length);
    }, 3000);
  }
  
  // Clear Interval
  function stopInterval() {
    clearInterval(interval);
  }

  // Set Data

}