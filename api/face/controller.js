var analyze = require(__dirname + "/../../analyze.js")
var store = require(__dirname + "/../../store.js")

//===============================================
//================== Main function ==============
//===============================================
module.exports = function(req, res)
	{
	if((req.header("Content-Type") == "application/json" )&& req.body.image_uri)
		{
		analyze(req.body.image_uri)
		.then((result) =>
			{
			res.writeHead(200, {"Content-Type": "application/json"});
			res.write(JSON.stringify(result));
			res.end();
			})
		.catch((err) =>
			{
			if(err.error)
				{
				res.writeHead(err.error.statusCode, {"Content-Type": "application/json"});
				res.write(JSON.stringify(err.error));
				res.end();
				}
			else
				{
				res.writeHead(500, {"Content-Type": "text"});
				res.write("Internal server error.");
				res.end();
				}
			})
		}
	else
		{
		res.writeHead(400, {"Content-Type": "text"});
		res.write("Request must be a json with 'image_uri' as key which contains an array of valid image uri.");
		res.end();
		}
	return;
	}