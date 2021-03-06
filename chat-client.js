var socket = require('socket.io-client')('http://ec2-18-140-54-32.ap-southeast-1.compute.amazonaws.com:3000');
const repl = require('repl');
const chalk = require('chalk');

var username = 'anonymous';

socket.on('disconnect', function () {
  socket.emit('disconnect');
});

socket.on('connect', () => {
  console.log(chalk.red('=== start chatting ==='));
  username = process.argv[2];
});

socket.on('message', (data) => {
  const { cmd, username } = data
  console.log(chalk.green(username + ': ' + cmd.split('\n')[0]));
});

repl.start({
  prompt: '',
  eval: (cmd) => {
    socket.send({ cmd, username })
  }
});
