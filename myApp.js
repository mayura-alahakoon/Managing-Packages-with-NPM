const { json } = require('body-parser');
let express = require('express');
let app = express();
require('dotenv').config();

console.log("Hello World");



app.get("/", function(req, res) {
    res.send("Hello Express");
  });



app.use(express.static(__dirname + "/public/"));
app.use("/public", express.static(__dirname + "/public"));
  
app.get("/", function(req, res) {
res.sendFile(__dirname + "/views/index.html")
});


app.get("/json", function(req, res) {
    var jsonResponse = {"message": "Hello json"};

    if (process.env.MESSAGE_STYLE === "uppercase") {
        jsonResponse.message = jsonResponse.message.toUpperCase()
    }
        res.json(jsonResponse);
            

});




module.exports = app;
