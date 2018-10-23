//==================== Initializations ====================
//dynamic pages
const express = require("express");
const body_parser = require('body-parser');
const app = express();
 
var http = require("http");
app.use(express.json({limit: '10mb'}));

//pages modules/db/db

//==================== Server ====================
	
app.post("/api/face", function(req, res)
	{
	var api_controller = require(__dirname + "/api/face/controller.js");
	api_controller(req, res);
	});
	
//start server
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
