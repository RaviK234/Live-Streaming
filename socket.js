module.exports = (app) => {
  const io = require('socket.io');
  return io.listen(app);
}
