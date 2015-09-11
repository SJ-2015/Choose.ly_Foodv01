var db = require("./models");


//find all the users in database and their options
db.User.find({}, function(err, users){   //users is whatever you are looking for
    users.forEach(function(user){ //user is each element of "users"
        console.log(user);
        console.log(user.restuarants); 
    })
});

console.log("Can we find the right match?")

var username = "tester1";

//this finds the right data with the right username
 db.User.find({userName:username}, function(err, userMatched){
        if (err) {
          console.log(err);
        }
        console.log(userMatched);

    })