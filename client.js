const net = require('net');
const { IP, PORT } = require('./constants');

const connect = function() {
  const conn = net.createConnection({
    host: IP,
    port: PORT
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");

  conn.on('connect', () => {
    console.log('Houston, we have landed.');
    conn.write('Name: RJE');
  });

  conn.on('data', (data) => {
    console.log(data);
  });

  conn.on('close', () => {
    // close the stdin process
    process.exit();
  });

  return conn;
};

module.exports = { connect };