var ask_all = require("./api_calls/all.js");
var ask_microsoft = require(__dirname + "/api_calls/microsoft.js");
var ask_google = require(__dirname + "/api_calls/google_wrapper.js");
var ask_amazon = require(__dirname + "/api_calls/amazon_wrapper.js");
//===============================================
//================== Main function ==============
//===============================================

var img = [];
img[0] = "http://www.goaras.com/lol";
img[1] = "http://1.bp.blogspot.com/-oJTKO9FKmIw/TaH7yRRR6GI/AAAAAAAAAFY/gUxgJLS7xy0/s1600/happy_people.jpg";
img[2] = "http://ohtopten.com/wp-content/uploads/2016/01/2.jpg";



const toResultObject = (promise) => 
	{
	return promise
	.then(result => (result))
	.catch(error => (error));
	};


function analyze(img, company)
	{
	return new Promise((resolve, reject) =>
		{
		var funct;
		if(company)
			{
			switch(company.toLowerCase())
				{
				case "all":
					funct = ask_all;
					break;
				case "ms": case "microsoft":
					funct = ask_microsoft;
					break;
				case "az": case"aws": case "amazon":
					funct = ask_amazon;
					break;
				case "gg": case "google":
					funct = ask_google;
					break;
				default:
					reject({error: {statusCode: 400, message: "Second argument must be one of available companies. ('Microsoft', 'Google', 'Amazon', 'all')"}});
					break;
				}
			}
		else
			{
			funct = ask_all;
			}
		
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
				calls.push(funct(argument));
				}
			Promise.all(calls.map(toResultObject))
			.then((vals) =>
				{
				resolve(vals);
				})
			/*.catch((err) => 
				{
				console.log("MUST NOT HAPPEN");
				reject("MUST NOT HAPPEN");
				})*/;
			}
		else if (typeof img === "string")
			{
			funct({image_uri: img}).then((val) =>
				{
				return resolve(val);
				})
			.catch((err) => 
				{
				return reject(err);
				});
			}
		else
			{
			reject({error: {statusCode: 400, message: "First argument must be a string or an array of strings."}});
			}
		
			
		});
	};
module.exports = analyze;

/*
analyze_all(img)
.then((ret) =>
	{
	console.dir(ret, {depth: 3, colors: true});
	//console.log(JSON.stringify(ret));
	})
.catch((err) =>
	{
	console.log("MUST NOT HAPPEN");
	reject("MUST NOT HAPPEN");
	});
*/