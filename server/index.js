const app = require('express')();
const http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
	socket.emit(`news`, { hello: `world` });
	socket.on(`updating`, function(data1, data2, cb){
		console.log(`funky town`, data1, data2);
		cb({ 
			world: data1,
			hello: data2 
		})
	});

	socket.on(`patching`, data => {
		socket.emit(`patching client`, data);
	})
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});