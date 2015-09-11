
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

/* old rendering not used
Option.prototype.render = function(){
	$(".resultList").append( "<tr><th>"+"5"+"</th><td>"+this.optionName+"</td><td>"+this.criteria.food+"</td><td>"+this.criteria.service+"</td><td>"+this.score+"</td></tr>" ) 
}*/

//old choices pre-user and Mongod
// function renderChoices(){
// 	//request on the database page
// 	$.get("/database", function(res){
// 		//choiceIndex is the same as database in server js
// 		//may need to remove parse method, to be seen
// 		var choicesIndex = res;
// 		//need to grab template and append to parent next

// 		template = _.template($("#choiceDisplay-template").html());
// 		choiceList = choicesIndex.map(function(choice){
// 			return template(choice);
// 		});
		
// 		//clear existing content
// 		$(".resultList").html("");
// 		//append new full choice list to the result display
// 		$(".resultList").html(choiceList);
// 	})//end of GET request
// }//end of renderChoice


//new mongod and individualzed choices
function renderUserChoices(){
	//get user id from the results/usename page
	$.get(/results/, function (data, status){

			$.get("/database/tester1", function(res){

				//grab the list of choices from the user data
				var choicesIndex = res.restuarants;
				//need to grab template and append to parent next

				template = _.template($("#choiceDisplay-template").html());
				choiceList = choicesIndex.map(function(choice){
					return template(choice);
				});
			
				//clear existing content
				$(".resultList").html("");
				//append new full choice list to the result display
				$(".resultList").html(choiceList);
			})//end of get /database
	}); //end of get results/:username		
} //end of renderUserchoice


$(document).ready(function(){
	renderUserChoices();	

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
		
		//stringify so only properties are captured, but not methods
		var newOptionInJson = JSON.stringify(newOption);
		console.log(newOptionInJson);
		
		// post the new option to database page, need to send back as object via parsing
		$.post("/database", JSON.parse(newOptionInJson))
			.done(function(res){
		renderUserChoices();		
		}) //end of post

		//5. Store to DB, when you get a response back from index.js, display the new entry onto your list*/
	}) //end of onClick
})//end of doc.ready


