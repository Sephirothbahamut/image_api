//===============================================
//================== Amazon =====================
//===============================================
var request = require('request');
var aws = require("aws-sdk");
//var keys = require("keys.json")
var download = require(__dirname + "/download.js");
 
module.exports = function(img)
	{
	return new Promise((resolve, reject) =>
		{
		/*if(!img.image)
			{
			return reject("Argument bust be an object like {image: [file]}.");
			}*/
			
		aws.config.loadFromPath(__dirname + '/aws_credentials.json');
		aws.region = "us-east-1";
		var rekognition = new aws.Rekognition();
		var params = 
			{
			Image: {Bytes: img.image},
			Attributes: 
				[
				'ALL',
				]
			};
			
		rekognition.detectFaces(params, function (err, response) 
			{
			if(err)
				{return reject(err);}
			else
				{return resolve(response);}
			});
	
		});
	}

