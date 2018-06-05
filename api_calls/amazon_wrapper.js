
var ask_amazon = require(__dirname + "/amazon.js");
var download = require(__dirname + "/download.js");

module.exports = function ask(img)
	{
	return new Promise((resolve, reject) =>
		{
		/*if(!img.image_uri)
			{
			return reject("Argument bust be an object like {image_uri: [string]}.");
			}*/
			
		download(img.image_uri).then((img) =>
			{
			ask_amazon(img)
			.then((vals) =>
				{
				return resolve(vals);
				})
			.catch((err) => 
				{
				reject(err);
				});
			})
		.catch((err) =>
			{
			return reject(err);
			});
		
		});
	};