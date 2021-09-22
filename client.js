const net = require('net');

const connect = function () {
  const conn = net.createConnection({
    host: '135.23.223.133',
    port: '50542'
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");

  conn.on('connect', () => {
    console.log('We up in this b*tch');
    conn.write('Name: RJE');
    // let count = 0;

    // while (true) {
    //   if (count > 1000) {
    //     break;
    //   }
    //   setTimeout(() => {
    //     conn.write("Move: up");
    //   }, count += 50);
    // }
  })

  conn.on('data', (data) => {
    console.log(data);
  });

  return conn;
};

module.exports = { connect };