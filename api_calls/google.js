//===============================================
//================== Google =====================
//===============================================
var request = require('request');
var keys = require(__dirname + "/keys.json");

module.exports = function(img)
	{
	return new Promise((resolve, reject) =>
		{
		/*if(!img.image)
			{
			return reject("Argument bust be an object like {image: [file]}.");
			}*/
			
		//set request content
		var encoded = new Buffer(img.image).toString("base64");
		var google_request = 
			{"requests": 
				[{
				"image": 
					{
					"content": encoded
					},
				"features": 
					[
						{
						"type": "FACE_DETECTION",
						"maxResults": 1000
						}
					]
				}]
			}
		

		var google_request_options = 
			{
			url: "https://vision.googleapis.com/v1/images:annotate?key=" + keys.google_vision,
			method: "POST",
			json: true,
			body: google_request
			}
		
		//send request
		request(google_request_options, function(err, response)
			{
			if(err)
				{return reject({error: {statusCode: 500, message: err}});}
			else if(response.statusCode != 200)
				{return reject({error: {statusCode: response.statusCode, message: response.body}});}
			else
				{
				return resolve(response.body.responses[0]);
				}
			});
		
		});
	}