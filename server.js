const net = require('net');
const fs = require('fs');

//System module
const {RecordService} = require('./modules/record/service')

// サーバーを設定
const server = net.createServer(async (connection) => {
  console.log('connected.');

  //Disconnect
  connection.on('close', () => {
    console.log('disconnected.');
  });

  //Recieve & recording
  connection.on('data', async (data) => {    
    data = JSON.parse(data.toString())
    const rs = new RecordService(data)
    await rs.doFunc()
    .catch(err=>{
      console.error(err)
    })
    console.log("recording.")
  });

  //Error
  connection.on('error', (err) => {
    console.error(err.message);
  });

  connection.write('connected unix domain socket.');
  connection.end();

});

// ソケットファイルを削除（存在するとlistenできない）
try {
  fs.unlinkSync('/tmp/unix.sock');
} catch (err) {
  console.log('not found /tmp/unix.sock.')
}

// UNIXドメインソケットでlistenする
server.listen('/tmp/unix.sock');
console.log('listening on /tmp/unix.sock. Start Flight redording.');