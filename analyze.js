var ask_ms_picture = require(__dirname + "/api_calls/microsoft.js").analyze_image;
var ask_ms_face = require(__dirname + "/api_calls/microsoft.js").analyze_face;
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
					reject({error: {statusCode: 400, message: "First argument must be an array of strings."}});
					}
				calls.push(ask_ms_picture(img[i]));
				calls.push(ask_ms_face(img[i]));
				}
				
			Promise.all(calls.map(toResultObject))
			.then((vals) =>
				{
				var pic_data = [];
				var arr = [];
				for(var i in img)
					{
					var content_index = (parseInt(i)*2).toString();
					var faces_index = ((parseInt(i)*2)+1).toString();
					if(!vals[content_index].error)
						{
						pic_data.push({url: img[i], content: vals[content_index].content});
						if(!vals[faces_index].error)
							{
							pic_data[i].faces = vals[faces_index].content;
							for(var f in vals[faces_index].content)
								{
								arr.push(vals[faces_index].content[f].faceId);
								}
							}
						}
					}
				ask_ms_group(arr)
				.then((groups) =>
					{
					return resolve({images: pic_data, groups: groups.content});
					})
				.catch((err) =>
					{
					return reject(err);
					});
				})
			.catch((err) => 
				{
				console.log("MUST NOT HAPPEN");
				return reject("MUST NOT HAPPEN");
				});
				
			
			}
		else
			{
			return reject({error: {statusCode: 400, message: "First argument must be a an array of strings."}});
			}
		
			
		});
	};
module.exports = analyze;