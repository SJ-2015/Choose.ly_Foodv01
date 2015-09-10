// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var choices_list =[
  {"optionName":"Sushirittos","criteria":{"food":5,"service":6},"score":11},
  {"optionName":"unhealthyPlace","criteria":{"food":6,"service":4},"score":10},
  {"optionName":"decentPlace","criteria":{"food":1,"service":5},"score":6},
];


//hardcode userdata
var sampleUser = [
  {
    userName: "tester1",
    password: "ok",
    email: "ok",
    restuarants: choices_list
  }
];


db.User.remove({}, function(err, choice){

  db.User.create(sampleUser, function(err, users){
    if (err) { return console.log(err) };
    console.log("created", users.length, "users")
    process.exit();
  })

});
