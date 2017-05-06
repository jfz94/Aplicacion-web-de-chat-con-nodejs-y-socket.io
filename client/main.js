// CLIENT //

var socket = io.connect('http://localhost:6677',{'forceNew':true}); // forzar conexion

socket.on('messages', function(data){
	console.log(data);
	render(data);
}); // recogemos lo que hemos emitido desde el servidor //

function render(data){
	var html = data.map(function(message,index){
		return(`<div class="message">
				<strong>${message.nickname}</strong> dice: 
				<p>${message.text}</p>
			</div>`);
	}).join(' ');
	var div_msgs = document.getElementById('messages');
	div_msgs.innerHTML = html;
	div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e){
	var message = {
		nickname: document.getElementById('nickname').value,
		text: document.getElementById('text').value
	};
	document.getElementById('nickname').style.display= 'none';
	// evento del cliente al servidor //
	socket.emit('add-message', message);
	return false; // cortar ejecucion //
}