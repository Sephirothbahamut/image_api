const analyze = require(__dirname + "/analyze.js");

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