var mysql = require('mysql');

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'hungerbuddy',
  multipleStatements: true,
  connectionLimit: 100,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
});

// Handle connection errors
pool.on('connection', function (connection) {
  console.log('[DB] Connected as id ' + connection.threadId);
});

pool.on('error', function(err) {
  console.error('[DB] Database error occurred:');
  console.error('- Error Code:', err.code);
  console.error('- Error Message:', err.message);
  console.error('- Fatal:', err.fatal);
  
  if(err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('[DB] Connection lost, attempting to reconnect...');
  } else {
    throw err;
  }
});

module.exports = pool;
