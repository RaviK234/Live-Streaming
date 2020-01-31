const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = mongoose.Schema({
   chatId: String,
   itemId: {
    type: String, unique: true, index: true,
    },
   sender: String,
   message: String,
   senderImg: String,
   publishedAt: Date
});

module.exports = mongoose.model('Chats', ChatSchema);