var express = require("express"),
    bodyParser = require("body-parser"),
    path = require("path"),
    _ = require("underscore"),
	app = express(),
    views = path.join(process.cwd(), "views/");

app.use(bodyParser.urlencoded({extended: true}));

// CONFIG //
// serve js & css files
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));
// body parser config to accept all datatypes
app.use(bodyParser.urlencoded({ extended: true }));
//allows middleware (bodyParser) to use req.body ==> appends new key pair

// ROUTES //
app.get("/", function (req, res){
  // render home.html
  res.sendFile(path.join(views + 'home.html'));
});


//temporary: access allowed at "results" --> review cookie/authoriation/session session for update needed
app.get("/results", function (req, res){
  // render results.html
  res.sendFile(path.join(views + 'results.html'));
});


//start server
app.listen(3000, function (){
  console.log("listening on port 3000");
});