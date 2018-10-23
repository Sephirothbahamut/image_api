//const analyze = require(__dirname + "/analyze.js");
const request = require("request")

function pause()
	{
	var fs = require("fs")
	var fd = fs.readSync(process.stdin, "rs")
	fs.readSync(fd, new Buffer(1), 0, 1)
	fs.closeSync(fd)
	}


var img = [];
//han solo
img[0] = "https://cdn.arstechnica.net/wp-content/uploads/2017/06/star-wars-force-awakens-han-solo-chewbacca-800x400.jpg";
//indiana jones
img[1] = "https://cdn.20m.es/img2/recortes/2018/04/27/688990-600-338.jpg?v=20180626191758";
img[2] = "https://uproxx.files.wordpress.com/2018/07/indiana-jones-5-delayed-2021-jpg.jpeg?quality=95&w=650";
//gandalf
img[3] = "https://vignette.wikia.nocookie.net/lotr/images/7/75/MV5BMTc2NjQ1MDExOV5BMl5BanBnXkFtZTgwNTYzNDM2MzE%40._V1_SX1784_SY876_.jpg/revision/latest?cb=20150413145849&path-prefix=de";
img[4] = "https://i.redd.it/ub7q6cblk97z.jpg";
img[5] = "https://cinefreaks.gr/wp-content/uploads/2017/12/gandalfspeaks_v2_727.jpg";
img[6] = "https://www.rollingstone.it/wp-content/uploads/2016/01/ddd-e1453994878212.jpg";
img[7] = "https://images.hellogiggles.com/uploads/2017/12/17022221/picture-of-lotr-gandalf-photo.jpg";
img[8] = "https://middle-earth.xenite.org/files/2011/09/gandalf-shire-01.jpg";

//img[0] = "http://www.goaras.com/lol";
//img[1] = "http://1.bp.blogspot.com/-oJTKO9FKmIw/TaH7yRRR6GI/AAAAAAAAAFY/gUxgJLS7xy0/s1600/happy_people.jpg";
//img[2] = "http://ohtopten.com/wp-content/uploads/2016/01/2.jpg";
function analyze_request(image_uri)
	{
	return new Promise((resolve, reject) =>
		{
		var options = 
			{
			url: "http://localhost:3000/api/face",
			method: "POST",
			json: true,
			body: {image_uri: image_uri}
			};
		
		console.log(image_uri);
		
		request(options, function(err, response)
			{
			/*if(err)
				{
				return reject({error: {statusCode: 404, message: "could not connect to server."}});
				}
			else
				{
				return resolve(response.body);
				}*/
			if(err)
				{
				return resolve(err);
				}
			else
				{
				return resolve(response.body);
				}
			});
		
		});
	}
	
console.log("==========================")

analyze_request(img).then((res) => {console.dir(res, {depth: null, colors: true});}).catch((err)=>{console.log("ms WHY");});

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