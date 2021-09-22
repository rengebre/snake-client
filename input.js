const setupInput = function(conn) {
  let handler;
  let prevKey;
  let speed = 100;

  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();

  const handleUserInput = function(key) {
    if (key === '\u0003') {
      process.exit();
    }

    const oppositeKeys = {
      a: 'd',
      w: 's',
      d: 'a',
      s: 'w'
    }
    // console.log('key:', key, 'opp key:', oppositeKeys[prevKey]);
    if (prevKey && key[0] !== oppositeKeys[prevKey]) {
      clearInterval(handler)
      prevKey = key[0];
    }

    if (!prevKey){
      prevKey = key[0];
    }

    switch (key[0]) {
      case 'w':
        handler = setInterval(() => {
          conn.write("Move: up");
        }, speed * 2);
        break;
      case 'a':
        handler = setInterval(() => {
          conn.write("Move: left");
        }, speed);
        break; 
      case 's':
        handler = setInterval(() => {
          conn.write("Move: down");
        }, speed);
        break; 
      case 'd':
        handler = setInterval(() => {
          conn.write("Move: right");
        }, speed * 2);
        break;  
    }
  };
  
  stdin.on('data', handleUserInput);
  return stdin;
};


module.exports = { setupInput };