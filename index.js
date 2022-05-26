const express = require("express");
const app = express();
const path = require("path");
const redditData = require("./data.json")
console.log(redditData);

app.use(express.static(path.join(__dirname, "public"))); 


app.set("view engine", "ejs")
// HELPS EXPRESS FIND /VIEWS WHEN STARTING THE SERVER FROM ANY DIRECTORY DIRNAME/VIEWS
app.set("views", path.join(__dirname, "/views"))
app.get("/", (req,res) => {
	res.render("home")
})

app.get("/random", (req,res) => {
	const randomNum = Math.floor(Math.random() * 100) + 1 ;
	let isEven = false;
	if(randomNum % 2 === 0){
		isEven = true;
	}
	res.render("random", {randomNum, isEven});
})

app.get("/r/:subreddit", (req,res) => {
	const {subreddit} = req.params;
	const data = redditData[subreddit];
	if(data){
		res.render("subreddit", {subreddit, data})	
	}else{
		res.send("No data was loaded")
	}
})

app.get("/cats", (req,res) => {
	const cats = ["Tommy", "Pesho", "Demon", "Kitty", "Mentus"]
	res.render("cats", {cats});
})

app.listen(3000, () =>{
	console.log("SERVER IS RUNNING ON PORT 3000");
})