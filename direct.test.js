const analyze = require(__dirname + "/analyze.js");

var img = [];
img[0] = "http://www.goaras.com/lol";
img[1] = "http://1.bp.blogspot.com/-oJTKO9FKmIw/TaH7yRRR6GI/AAAAAAAAAFY/gUxgJLS7xy0/s1600/happy_people.jpg";
img[2] = "http://ohtopten.com/wp-content/uploads/2016/01/2.jpg";


test("invalid call, invalid argument types", ()=>
	{
	expect(analyze(5)).rejects.toEqual({error: {statusCode: 400, message: "First argument must be a string or an array of strings."}});
	expect(analyze(["valid", 1])).rejects.toEqual({error: {statusCode: 400, message: "First argument must be a string or an array of strings."}});
	expect(analyze("valid", "invalid")).rejects.toEqual({error: {statusCode: 400, message: "Second argument must be one of available companies. ('Microsoft', 'Google', 'Amazon', 'all')"}});
	});
	
test("ask Microsoft to analyze invalid picture", ()=>
	{
	return(
		analyze(img[0], "ms")
		.then((ret) =>
			{
			})
		.catch((err) =>
			{
			expect(err).toHaveProperty("error");
			})
		);
	}, 10000);

test("ask Microsoft to analyze valid picture", ()=>
	{
	return(
		analyze(img[1], "ms")
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
		analyze(img, "ms")
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
		analyze(img[0], "az")
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
		analyze(img[1], "az")
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
		analyze(img, "az")
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
		analyze(img[0], "gg")
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
		analyze(img[1], "gg")
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
		analyze(img, "gg")
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
		analyze(img[0], "all")
		.catch((err) =>
			{
			expect(err).toHaveProperty("error");
			})
		);
	}, 10000);
	
test("ask all to analyze valid picture", ()=>
	{
	return(
		analyze(img[1])
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
		analyze(img[2])
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
		analyze(img)
		.then((ret) =>
			{
			expect(ret).toHaveLength(img.length);
			})
		);
	}, 10000);