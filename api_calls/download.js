
var request = require("request");
var image_type = require("image-type");

module.exports = function download(image_uri)
	{
	return new Promise((resolve, reject) =>
		{
		var options = 
			{
			uri: image_uri,
			encoding: null
			};
		
		
		
		request(options, function(err, response)
			{
			if(err)
				{
				return reject({error: {statusCode: 400, message: "could not find image."}});
				}
			else
				{
				if(image_type(response.body))
					{
					return resolve({image_uri: image_uri, image: response.body});
					}
				else
					{
					return reject({error: {statusCode: 400, message: "could not read image."}});
					}
				}
			});
		
		});
	}