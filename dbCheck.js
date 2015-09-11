var db = require("./models");


//find all the users in database and their options
/*db.User.find({}, function(err, users){   //users is whatever you are looking for
    users.forEach(function(user){ //user is each element of "users"
        console.log(user);
        console.log(user.restuarants); 
    })
});
*/
var username = "tester2";
console.log("Pre-test: find the right match for" + username);

//this finds the right data with the right username
 db.User.find({userName:username}, function(err, userMatched){
        if (err) {
          console.log(err);
        };
        console.log(userMatched[0].restuarants.length);
    })

db.User.findOne({userName:username}, function(err, userMatched){
	var userData = userMatched;
	console.log(userData.restuarants.length);
	if(err){
	  return console.log(err);
	}
	//note only working with one object data
	var optionID = "55f270edb4acc2b7eca97f9c";
	console.log(optionID);    
	//walk through User's category.options array to find match
	for(var i = 0; i<userMatched.restuarants.length; i++){
	      //if id of option match
	    console.log(userMatched.restuarants[i]);
	    if(userMatched.restuarants[i]._id.toString()=== optionID) {
	    console.log(userMatched.restuarants[i]);
	    userMatched.restuarants[i].remove();
	    console.log("removed");
	    break;  
	    };//end if if statement
	}//end of for loop
	userMatched.save();
	console.log(userData.restuarants.length);
});//end of db.find

/*

console.log("Post-test: find the right match for" + username);

//this finds the right data with the right username
 db.User.find({userName:username}, function(err, userMatched){
        if (err) {
          console.log(err);
        };
        console.log(userMatched[0].restuarants.length);
    })
*/
