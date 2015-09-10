
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/* Embedded */
var RestuarantSchema = new Schema({
	optionName: String,
	criteria: {food: Number,
			   service: Number
			   },
	score: Number
});

var userSchema = new Schema ({
	name: String,
	password: String,
	email: String,
	restuarants: [RestuarantSchema]
});

var Restuarant = mongoose.model("Restuarant", RestuarantSchema);
var User = mongoose.model("User", userSchema);

module.exports = User;

