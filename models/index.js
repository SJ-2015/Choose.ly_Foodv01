
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/choosely_food_app");


// boss of user.js; other files going into model folder; "user" file is modular/replacable
module.exports.User = require("./user"); 