const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = mongoose.Schema({
    userId: String,
    url: String,
    title: String,
    description: String,
    thumbnails: Object,
    name: String,
    email: String,
    keyWord: [],
    chatId: String, 
    createdAt: Date
});

module.exports = mongoose.model('Session', SessionSchema);