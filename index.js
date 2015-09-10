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

var initialDataStrg =[
  {"optionName":"Sushirittos","criteria":{"food":5,"service":6},"score":11},
  {"optionName":"unhealthyPlace","criteria":{"food":6,"service":4},"score":10},
  {"optionName":"decentPlace","criteria":{"food":1,"service":5},"score":6},
];


var newChoiceDummy =
  {"optionName":"hardcodeDummy","criteria":{"food":5,"service":6},"score":11};
  

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

//database index path --> send back initail data when page is visited
app.get("/database", function(req, res){
  //rend choice index as json
  res.send(initialDataStrg);
})

app.post("/database", function(req, res){
  //use "option" to refer to object, "choice" for the data (able to act on)
  console.log(req.body);
  var newChoice = req.body;
  console.log(newChoice);
  //! Skip on adding ID, may need later
  initialDataStrg.push(newChoice);
  res.send("this is a new choice");
});

//start server
app.listen(3000, function (){
  console.log("listening on port 3000");
});