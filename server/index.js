// SERVER //

var express = require('express');
var app = express();
var server = require('http').Server(app); // libreria node
var io = require('socket.io')(server);

var port = 6677;

app.use(express.static('./../client')); // cargar html en client

app.get('/route',function(req,res){
	res.status(200).send('Hello world');
});

var messages = [{
	id: 1,
	text: 'Bienvenido al chat privado de Socket.io y NodeJS de Jordi Felip',
	nickname: 'Bot - aptrix'
}]; // array de mensajes //

io.on('connection', function(socket){
	// abrir conexion socket //
	// recibe connexiones clientes //
	console.log("El cliente con IP: " + socket.handshake.address + " se ha conectado");
	socket.emit('messages',messages); // emitimos el mensaje a los clientes //
	// recoger evento //
	socket.on('add-message', function(data){
		messages.push(data); // guardamos nuevo objeto en el array 
		io.sockets.emit('messages', messages); // emitimos array actualizado
	});
}); 

server.listen(port,function(){
	console.log('The server is running in http://localhost:' + port);
});