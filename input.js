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
    };

    const moveSnake = function(direction, speed) {
      // console.log('key:', key, 'opp key:', oppositeKeys[prevKey]);
      if (prevKey && key[0] !== oppositeKeys[prevKey]) {
        clearInterval(handler);
        prevKey = key[0];
      }
  
      if (!prevKey) {
        prevKey = key[0];
      }
   
      handler = setInterval(() => {
        conn.write(`Move: ${direction}`);
      }, speed);
    };

    switch(key[0]) {
      case 'w':
        moveSnake('up', speed);
        break;
      case 'a':
        moveSnake('left', speed * 2);
        break;
      case 's':
        moveSnake('down', speed);
        break;
      case 'd':
        moveSnake('right', speed * 2);
        break;
      case 'j':
        conn.write("Say: I AM A GOD!");
        break;
      case 'k':
        conn.write('Say: oh... nvm');
        break;
    };
  };
  
  stdin.on('data', handleUserInput);
  return stdin;
};


module.exports = { setupInput };