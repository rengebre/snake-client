const net = require("net");
const { connect } = require('./client');

const setupInput = function(callback) {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();
  
  stdin.on('data', callback);
  return stdin;
};

const handleUserInput = function(key) {
  if (key === '\u0003') {
    process.exit();
  }
};

// establishes a connection with the game server
console.log("Connecting ...");
const conn = connect();
setupInput(handleUserInput);

