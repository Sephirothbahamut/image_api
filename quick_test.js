const analyze = require(__dirname + "/analyze.js");
const request = require("request")
function pause()
	{
	var fs = require("fs")
	var fd = fs.readSync(process.stdin, "rs")
	fs.readSync(fd, new Buffer(1), 0, 1)
	fs.closeSync(fd)
	}


var img = [];
img[0] = "http://www.goaras.com/lol";
img[1] = "http://1.bp.blogspot.com/-oJTKO9FKmIw/TaH7yRRR6GI/AAAAAAAAAFY/gUxgJLS7xy0/s1600/happy_people.jpg";
img[2] = "http://ohtopten.com/wp-content/uploads/2016/01/2.jpg";
function analyze_request(image_uri, company)
	{
	return new Promise((resolve, reject) =>
		{
		var options = 
			{
			url: "http://localhost:3000/api/image",
			method: "POST",
			json: true,
			body: {image_uri: image_uri, company: company}
			};
		
		request(options, function(err, response)
			{
			if(err)
				{
				return reject({error: {statusCode: 404, message: "could not connect to server."}});
				}
			else
				{
				return resolve(response.body);
				}
			});
		
		});
	}
/*
console.log("==========================")
analyze_request(img[0], "microsoft").then((res) => {console.dir(res, {depth: 2, colors: true});}).catch((err)=>{console.log(err);});
analyze_request(img[0], "google").then((res) => {console.dir(res, {depth: 2, colors: true});}).catch((err)=>{console.log(err);});
analyze_request(img[0], "amazon").then((res) => {console.dir(res, {depth: 2, colors: true});}).catch((err)=>{console.log(err);});
*/
/*
console.log("==========================")
analyze_request(img[1], "ms").then((res) => {console.dir(res, {depth: 2, colors: true});}).catch((err)=>{console.log("ms WHY");});
analyze_request(img[1], "google").then((res) => {console.dir(res, {depth: 2, colors: true});}).catch((err)=>{console.log("gg WHY");});
analyze_request(img[1], "aws").then((res) => {console.dir(res, {depth: 2, colors: true});}).catch((err)=>{console.log("az WHY");});
*/
/*
console.log("==========================")
analyze(img[0]).then((res) => {console.dir(res, {depth: 2, colors: true});}).catch((err)=>{console.log(err);});
*/
/*
console.log("==========================")
analyze(img).then((res) => {console.dir(res, {depth: 4, colors: true});}).catch((err)=>{console.log("ms WHY");});
*/
/*
console.log("==========================")
analyze(img[0], "microsoft").then((res) => {console.dir(res, {depth: 2, colors: true});}).catch((err)=>{console.log(err);});
analyze(img[0], "google").then((res) => {console.dir(res, {depth: 2, colors: true});}).catch((err)=>{console.log(err);});
analyze(img[0], "amazon").then((res) => {console.dir(res, {depth: 2, colors: true});}).catch((err)=>{console.log(err);});
*/
/*
console.log("==========================")
analyze(img[1], "ms").then((res) => {console.dir(res, {depth: 2, colors: true});}).catch((err)=>{console.log("ms WHY");});
analyze(img[1], "google").then((res) => {console.dir(res, {depth: 2, colors: true});}).catch((err)=>{console.log("gg WHY");});
analyze(img[1], "aws").then((res) => {console.dir(res, {depth: 2, colors: true});}).catch((err)=>{console.log("az WHY");});
*/
/*
console.log("==========================")
analyze(img[0]).then((res) => {console.dir(res, {depth: 2, colors: true});}).catch((err)=>{console.log(err);});
*/
/*
console.log("==========================")
analyze(img).then((res) => {console.dir(res, {depth: 4, colors: true});}).catch((err)=>{console.log("ms WHY");});
*/