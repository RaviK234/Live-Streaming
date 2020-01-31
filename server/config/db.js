const Mongoose = require('mongoose');
const config = {
  database: {
    url: 'mongodb://localhost:27017/testDb'
  }
}

Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex', true)
Mongoose.connect(config.database.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = Mongoose.connection;

db.once('open', () => {
  console.log('Connection with database succeeded.');
});

exports.Mongoose = Mongoose;

exports.db = db;