/*
the code here is supposed to take in data using OOP - aim to complete on tuesday 
Steps: 
1. first set up code for taking in data as parameter and able to computer
2. figure out rendering (including front end web design)
3. incorporate input from webpage using forms to the compute engine
4. figure out data storage
5. figure out how to sort
5. figure out user authorization and routing
6. front end = make pretty
*/

//setting prototype function
function Option(optionName) {
	this.optionName = optionName;
	this.criteria = {};
}

//assign scores to each criteria & sum them
Option.prototype.setCriteria = function(foodScore, serviceScore){
	this.criteria.food = foodScore;
	this.criteria.service = serviceScore;
	this.score = this.sumScore();
}

//sums up the score
Option.prototype.sumScore = function(){
	var sum = this.criteria.food + this.criteria.service;
	return sum;
}

Option.prototype.render = function(){
	$(".resultList").append( "<tr><th>"+"5"+"</th><td>"+this.optionName+"</td><td>"+this.criteria.food+"</td><td>"+this.criteria.service+"</td><td>"+this.score+"</td></tr>" ) 
}


function renderChoices(){
	//request on the database page
	$.get("/database", function(res){
		//choiceIndex is the same as database in server js
		//may need to remove parse method, to be seen
		var choiceIndex = JSON.parse(res);
		//need to grab template and append to parent next
		//!! comeback to this
	})//end of GET request
}//end of renderChoice


$(document).ready(function(){

	$("#addButton").on("click", function(event){
		//prevent form submission
		event.preventDefault();
		//grab the value on page
		var optionName = document.getElementById("optionNameInput").value;
		var foodScore = Number(document.getElementById("foodScoreInput").value);
		var serviceScore = Number(document.getElementById("serviceScoreInput").value);

		var newOption = new Option(optionName);
		newOption.setCriteria(foodScore,serviceScore);
		/*newOption.render();  //old appending rendering with no database*/
		var newOptionInJson = JSON.stringify(newOption);
		console.log(newOptionInJson)
		
		// post the new option to database page
		$.post("/database", $(newOptionInJson))
			.done(function(res){
				res.send("new option sent");
				//response received is updated database;
		renderChoices();		
		})
		//5. Store to DB, when you get a response back from index.js, display the new entry onto your list*/
	})
})


