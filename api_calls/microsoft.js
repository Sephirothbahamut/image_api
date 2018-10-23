//===============================================
//================== Microsoft ==================
//===============================================
var request = require('request');
var keys = require(__dirname + "/keys.json");

function microsoft_request(req_url, req_content, req_key)
	{
	return new Promise((resolve, reject) =>
		{
		var microsoft_request_options = 
			{
			"url": keys.base_url + req_url,
			"method": "POST",
			"json": true,
			"body": req_content,
			"headers": 
				{
				"Ocp-Apim-Subscription-Key": req_key
				}
			};
		
		//send request
		request(microsoft_request_options, function(err, response)
			{
			if(err)
				{
				return reject({uri: req_content.url, error: {statusCode: 500, message: err}});
				}
			else if(response.statusCode != 200)
				{
				return reject({uri: req_content.url, error: {statusCode: response.statusCode, message: response.body}});
				}
			else
				{
				return resolve({uri: req_content.url, content: response.body});
				}
			});
		});
	}


//face
module.exports.analyze_face = function(img)
	{
	//set request content
	const url = "/face/v1.0/detect" + "?"
		+ "returnFaceId=true" + "&"
		+ "returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses";
		

	const content = 
		{
		"url": img.image_uri
		};
	
	const key = keys.ms_face;
	
	return(microsoft_request(url, content, key));
	} 
	
//analyze
module.exports.analyze_image = function (img)
	{
	const url = "/vision/v1.0/analyze" + "?"
		+ "visualFeatures=Categories,Description,Tags,Faces" + "&"
		+ "detauls=" + "&"
		+ "language=en";

	const content = 
		{
		"url": img.image_uri
		};
		
	const key = keys.ms_vision;
		
	return(microsoft_request(url, content, key));
	}
	
//group faces
module.exports.face_group = function (ids)
	{
	const url = "/face/v1.0/group";

	const content = 
		{
		"faceIds": ids
		};
		
	const key = keys.ms_face;
		
	return(microsoft_request(url, content, key));
	}
	
	
/*module.exports.create_group = function(gn)
	{
	//set request content
	const url = "https://northeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/" + gn;
	
	const content = 
		{
		"name": gn
		};
	
	return(microsoft_request(url, content));
	}*/