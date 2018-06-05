
var ask_microsoft = require(__dirname + "/microsoft.js");
var ask_google = require(__dirname + "/google.js");
var ask_amazon = require(__dirname + "/amazon.js");
var download = require(__dirname + "/download.js");

/*const toResultObject = (promise) => 
	{
	return promise
	.then(result => (result))
	.catch(error => (error));
	};*/


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
			var calls = [];
			calls[0] = ask_microsoft(img);
			calls[1] = ask_google(img);
			calls[2] = ask_amazon(img);
			
			Promise.all(calls/*.map(toResultObject)*/)
			.then((vals) =>
				{
				return resolve({image: img.image_uri, microsoft: vals[0], google: vals[1], amazon: vals[2]});
				})
			/*.catch((err) => 
				{
				return reject({error: {err}, attention: "MUST NOT HAPPEN"});
				console.log("MUST NOT HAPPEN")
				})*/;
			})
		.catch((err) =>
			{
			return reject(err);
			});
		
		});
	};