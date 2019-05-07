var shelljs = require('shelljs');
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/W3D_HW4.html');
});

app.get ('/api', function (req, res) {

  var Vmax_x = req.query.Vmax_x;
  var Vmax_y = req.query.Vmax_y;
  var Vmin_x = req.query.Vmin_x;
  var Vmin_y = req.query.Vmin_y;
  var cpos_x = req.query.cpos_x;
  var cpos_y = req.query.cpos_y;
  var radius = req.query.radius;

	shelljs.exec('circleRect.exe ' + Vmax_x + ' ' + Vmax_y + ' ' + Vmin_x + ' ' + Vmin_y + ' ' + cpos_x + ' ' + cpos_y + ' ' + radius, function(status, output) {
	  //console.log('Exit status:', status);
	  //console.log('Program output:', output);
    //console.log("Radius : " + radius);


      var output = {
        status: status,
        output: output
      };


      /*
        The response header for supporting CORS:
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      */

	  res.writeHead(200, {
		  "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type"
	  });

	  res.write( JSON.stringify(output) );
	  res.end();

	});

});


// or simply
// app.listen (1337);
// will do

var server = app.listen (1337, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log ('server started on http://' + host + ':' + port);
});
