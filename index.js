var express = require("express"),
    bodyParser = require("body-parser"),
    path = require("path"),
    _ = require("underscore"),
	app = express(),
    views = path.join(process.cwd(), "views/");
var db = require('./models'); //stands for database, goes to index.js within model

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
//need to make the results page dynamic by users
app.get("/results", function (req, res){
  // render results.html
  res.sendFile(path.join(views + 'results.html'));
});


//database reroute via Mongod
app.get("/database", function index(req, res){
    db.User.find({}, function(err, users_list){
        if (err) {
          console.log(err);
          return res.sendStatus(400);
        }
        res.send(users_list);

    })//end of db.find
})//end of get function


//db.User.find({userName:username}, function(err, userMatched)
//new individual result page via Mongod
app.get("/database/:username", function( req, res){
    var username =req.params.username;
    console.log(username);

    db.User.find({userName:username}, function(err, userMatched){
        if (err) {
          console.log(err);
          return res.sendStatus(400);
        }
        res.send(userMatched);

    })//end of db.find
})//end of get /database/individual

app.get("/results/:usename", function (req, res){
  // render results.html
  res.sendFile(path.join(views + 'results.html'));
});

app.post("/database/:username", function create(req, res){
    //use "option" to refer to object, "choice" for the data (able to act on)
    var username =req.params.username;
    var newChoice = req.body;
    console.log(newChoice);
    //find the right user on mongod db
    //push new choice to there
    db.User.findOne({userName:username}, function(err, userMatched){
        if(err){
          return console.log(err);
        }
        //push the new choice to the right user
        userMatched.restuarants.push(newChoice);
        //save the user data after new choice is added;
        userMatched.save(function(err, success){
            if(err) {return console.log(err);}
            res.send(newChoice);
        })//end of .save
    }) //end of db.find
});


//start server
app.listen(3000, function (){
  console.log("listening on port 3000");
});