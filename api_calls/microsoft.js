//===============================================
//================== Microsoft ==================
//===============================================
var request = require('request');
var keys = require(__dirname + "/keys.json");
 
module.exports = function(img)
	{
	return new Promise((resolve, reject) =>
		{
		/*if(!img.image_uri)
			{
			return reject("Argument bust be an object like {image_uri: [string]}.");
			}*/
			
		//set request content
		const microsoft_request_url = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze" + "?"
			+ "visualFeatures=Categories,Description,Tags,Faces" + "&"
			+ "detauls=" + "&"
			+ "language=en";

		const microsoft_request = 
			{
			"url": img.image_uri
			};
			
		var microsoft_request_options = 
			{
			"url": microsoft_request_url,
			"method": "POST",
			"json": true,
			"body": microsoft_request,
			"headers": 
				{
				"Ocp-Apim-Subscription-Key": keys.ms_vision
				}
			};
		
		//send request
		request(microsoft_request_options, function(err, response)
			{
			if(err)
				{return reject({error: {statusCode: 500, message: err}});}
			else if(response.statusCode != 200)
				{
				return reject({error: {statusCode: response.statusCode, message: response.body}});
				}
			else
				{return resolve(response.body);}
			});
		
		});
	}