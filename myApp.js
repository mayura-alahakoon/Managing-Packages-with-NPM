let express = require("express");
var bGround = require('fcc-express-bground');
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

function getTheCurrentTimeString() {
    return new Date().toString();
}

app.get("/now", (req, res, next) =>{
    req.time = getTheCurrentTimeString();
    next();
}, function(req, res) {
    res.json({ time: req.time});
})

app.get("/:word/echo", function(req, res) {
    res.json({ echo: req.params.word});
});
module.exports = app;