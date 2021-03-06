var request = require("request");

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


test("invalid call, invalid argument types", ()=>
	{
	return(
		analyze_request(5)
		.then((ret) =>
			{
			expect(ret).toHaveProperty("error");
			})
		.catch((err) =>
			{
			})
		);
	return(
		analyze_request(["valid", 1])
		.then((ret) =>
			{
			expect(ret).toHaveProperty("error");
			})
		.catch((err) =>
			{
			})
		);
	return(
		analyze_request("valid", "invalid")
		.then((ret) =>
			{
			expect(ret).toHaveProperty("error");
			})
		.catch((err) =>
			{
			})
		);
	});
	
test("ask Microsoft to analyze invalid picture", ()=>
	{
	return(
		analyze_request(img[0], "ms")
		.then((ret) =>
			{
			expect(ret).toHaveProperty("error");
			})
		.catch((err) =>
			{
			})
		);
	}, 10000);

test("ask Microsoft to analyze valid picture", ()=>
	{
	return(
		analyze_request(img[1], "ms")
		.then((ret) =>
			{
			expect(ret).not.toHaveProperty("error");
			})
		.catch((err) =>
			{
			})
		);
	}, 10000);
	
test("ask Microsoft to analyze multiple pictures", ()=>
	{
	return(
		analyze_request(img, "ms")
		.then((ret) =>
			{
			expect(ret).not.toHaveProperty("error");
			})
		.catch((err) =>
			{
			})
		);
	}, 10000);
	
test("ask Amazon to analyze invalid picture", ()=>
	{
	return(
		analyze_request(img[0], "az")
		.then((ret) =>
			{
			expect(ret).toHaveProperty("error");
			})
		.catch((err) =>
			{
			})
		);
	}, 10000);

test("ask Amazon to analyze valid picture", ()=>
	{
	return(
		analyze_request(img[1], "az")
		.then((ret) =>
			{
			expect(ret).not.toHaveProperty("error");
			})
		.catch((err) =>
			{
			})
		);
	}, 10000);	
	
test("ask Amazon to analyze multiple pictures", ()=>
	{
	return(
		analyze_request(img, "az")
		.then((ret) =>
			{
			expect(ret).not.toHaveProperty("error");
			})
		.catch((err) =>
			{
			})
		);
	}, 10000);
	
test("ask Google to analyze invalid picture", ()=>
	{
	return(
		analyze_request(img[0], "gg")
		.then((ret) =>
			{
			expect(ret).toHaveProperty("error");
			})
		.catch((err) =>
			{
			})
		);
	}, 10000);

test("ask Google to analyze valid picture", ()=>
	{
	return(
		analyze_request(img[1], "gg")
		.then((ret) =>
			{
			expect(ret).not.toHaveProperty("error");
			})
		.catch((err) =>
			{
			})
		);
	}, 10000);
	
test("ask Google to analyze multiple pictures", ()=>
	{
	return(
		analyze_request(img, "gg")
		.then((ret) =>
			{
			expect(ret).not.toHaveProperty("error");
			})
		.catch((err) =>
			{
			})
		);
	}, 10000);
	
test("ask all to analyze invalid picture", ()=>
	{
	return(
		analyze_request(img[0], "all")
		.catch((err) =>
			{
			expect(err).toHaveProperty("error");
			})
		);
	}, 10000);
	
test("ask all to analyze valid picture", ()=>
	{
	return(
		analyze_request(img[1])
		.then((ret) =>
			{
			expect(ret.microsoft).not.toHaveProperty("error");
			expect(ret.google).not.toHaveProperty("error");	//make up your mind google please
			expect(ret.amazon).not.toHaveProperty("error");
			})
		);
	}, 10000);
	
test("ask all to analyze another valid picture", ()=>
	{
	return(
		analyze_request(img[2])
		.then((ret) =>
			{
			expect(ret.microsoft).not.toHaveProperty("error");
			expect(ret.google).not.toHaveProperty("error");	//make up your mind google please
			expect(ret.amazon).not.toHaveProperty("error");
			})
		);
	}, 10000);
	
test("ask all to analyze multiple pictures", ()=>
	{
	return(
		analyze_request(img)
		.then((ret) =>
			{
			expect(ret).toHaveLength(img.length);
			})
		);
	}, 10000);