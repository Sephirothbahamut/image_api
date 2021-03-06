var analyze = require(__dirname + "/../../analyze.js")


//===============================================
//================== Main function ==============
//===============================================
module.exports = function(req, res)
	{
	if((req.header("Content-Type") == "application/json" )&& req.body.image_uri)
		{
		analyze(req.body.image_uri, req.body.company)
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
				res.write(JSON.stringify(err));
				res.end();
				}
			else
				{
				console.log(err);
				res.writeHead(500, {"Content-Type": "text"});
				res.write("Internal server error.");
				res.end();
				}
			})
		}
	else
		{
		res.writeHead(400, {"Content-Type": "text"});
		res.write("Request must be a json with 'image_uri' as key; it can either be a single uri or an array.");
		res.end();
		}
	return;
	}