let express = require("express");
var bGround = require("fcc-express-bground");
let app = express();
const path = require("path");
const indexPath = path.resolve("./views/index.html");
var bodyParser = require("body-parser");

app.use((req, res, next) => {
	let string = req.method + " " + req.path + " - " + req.ip;
	console.log(string);
	next();
});

app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended:false}));

app.use(bodyParser.json());

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

app.get("/:word/echo",(req, res) =>{
    res.json({ echo: req.params.word});
});

app.get("/name", (req, res) =>{
    res.json({name: req.query.first + " " + req.query.last});
});

app.post("/name", function(req, res) {
    res.json({name: req.body.first + " " + req.body.last});
  
})
module.exports = app;