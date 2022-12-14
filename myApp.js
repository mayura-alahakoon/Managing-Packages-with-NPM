let express = require("express");
let app = express();
const path = require("path");
const indexPath = path.resolve("./views/index.html");

app.use((req, res, next) => {
	let string = req.method + " " + req.path + " - " + req.ip;
	console.log(string);
	next();
});
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
	res.sendFile(indexPath);
});
app.get("/json", (req, res) => {
	res.json({message: "hello json"});
});

module.exports = app;