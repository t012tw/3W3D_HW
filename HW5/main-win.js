var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var shelljs = require('shelljs');

var port = 3000;
server.listen (port, function() {
  console.log ('listening on port ' + port)
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/W3D_HW5.html');
});

///////////////////////////////////////
// global variables
// nID: for ID of connecting client
// status: array of status objects {id, turning}
//
var nID = 0;
var status = [];
var c1 = false , c2 = false;
var j = 0;
var time = 5;

io.on('connect', function(socket){
	
  sk = socket;
  //////////////////////////////////////////////////////////  
  // things to do when a client connects
  console.log ('a user connected with socket ');
  
  // assign and return the ID to the new client
  console.log ('client ' + nID + ' login ...')
  socket.emit ('id_set', nID);
  
  // broadcast to all OTHERS of new client 
  // socket.broadcast.emit ('new_id', nID)  
  // inform the status of all other clients ...
  // new kid needs to learn about old fellows
  
  status.push ({id: nID, run: false, load: false});
  console.log (status);
  io.emit ('update_status', status)
  
  // this must be the LAST thing to do
  ++nID;
  
  //////////////////////////////////////////////////////////  
  socket.on('toggle', function(myID) {
  	console.log (myID + ': toggle turning');
  	// find myID in status
  	let i;
  	for (i = 0; i < status.length; i++) {
  	  if (status[i].id === myID) break;
  	}
 	status[i].run = !status[i].run;
 	 	
 	console.log (status);
  	io.emit ('update_status', status);
  });
  
  socket.on('isReady', function(ID) {
		console.log(ID)
		if(ID === 0)c1 = true;
		if(ID === 1)c2 = true;
		if(c1 && c2){
			console.log('Both client load OK');
			io.emit ('time', time);					
		}
	});
});


	



