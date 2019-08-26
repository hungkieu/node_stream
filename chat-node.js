const http = require('http').createServer();
const io = require('socket.io')(http);
const port = 80;

log = console.log;

io.on('connection', (socket) => {
  log('connected');
  socket.on('message', (evt) => {
    log(evt);
    socket.broadcast.emit('message', evt)
  });
})

io.on('disconnect', (evt) => {
  log('disconnected');
});

http.listen(port, () => log(`server listening on port: ${port}`));
