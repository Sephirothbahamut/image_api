var ask_microsoft = require(__dirname + "/api_calls/microsoft.js").analyze_face;
var ask_ms_group =  require(__dirname + "/api_calls/microsoft.js").face_group;

const toResultObject = (promise) => 
	{
	return promise
	.then(result => (result))
	.catch(error => (error));
	};

//===============================================
//================== Main function ==============
//===============================================

function analyze(img)
	{
	return new Promise((resolve, reject) =>
		{
		var funct;
		if (img instanceof Array)
			{
			var calls = [];
			for(var i in img)
				{
				if(typeof img[i] !== "string")
					{
					reject({error: {statusCode: 400, message: "First argument must be a string or an array of strings."}});
					}
				var argument = {image_uri: img[i]};
				calls.push(ask_microsoft(argument));
				}
			Promise.all(calls.map(toResultObject))
			.then((vals) =>
				{
				var arr = [];
				for(var v in vals)
					{
					if(!vals[v].error)
						{
						for(var f in vals[v].content)
							{
							arr.push(vals[v].content[f].faceId);
							}
						}
					}
				ask_ms_group(arr)
				.then((groups) =>
					{
					return resolve({images: vals, groups: groups});
					})
				.catch((err) =>
					{
					return reject({images: vals, error: err});
					});
				})
			.catch((err) => 
				{
				console.log("MUST NOT HAPPEN");
				return reject("MUST NOT HAPPEN");
				});
				
			
			}
		else if (typeof img === "string")
			{
			ask_microsoft({image_uri: img}).then((val) =>
				{
				console.log(val);
				return resolve(val);
				})
			.catch((err) => 
				{
				return reject(err);
				});
			}
		else
			{
			return reject({error: {statusCode: 400, message: "First argument must be a string or an array of strings."}});
			}
		
			
		});
	};
module.exports = analyze;