/*
the code here is supposed to take in data using OOP - aim to complete on tuesday 
Steps: 
1. first set up code for taking in data as parameter and able to computer
2. incorporate input from webpage using forms to the compute engine
3. figure out rendering (including front end web design)
4. figure out data storage
*/

var option1 = {optionName: "sushiritto", food: 5, service: 7, total: 12}

//setting prototype function
function createOption(optionName) {
	this.optionName = optionName;
	this.criteria = {};
}

//assign scores to each criteria & sum them
createOption.prototype.setCriteria = function(foodScore, serviceScore){
	this.criteria.food = foodScore;
	this.criteria.service = serviceScore;
	this.score = this.sumScore();
}

//sums up the score
createOption.prototype.sumScore = function(){
	var sum = this.criteria.food + this.criteria.service;
	return sum;
}

createOption.prototype.render = function(){
	$(".resultList").append( "<tr><th>"+"5"+"</th><td>"+this.optionName+"</td><td>"+this.criteria.food+"</td><td>"+this.criteria.service+"</td><td>"+this.score+"</td></tr>" ) 
}

//tests:
var optionTwo = new createOption("burritos");
optionTwo.setCriteria(4,5)

console.log("for "+optionTwo.optionName+" the criteria are "); 
console.log(optionTwo.criteria);
console.log("for "+optionTwo.optionName+" the score is "+ optionTwo.score)
console.log(optionTwo);

$(document).ready(function(){
	optionTwo.render();
})

