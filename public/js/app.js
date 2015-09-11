
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

//for signin/signup page:





//for result/username pages:
//new mongod and individualzed choices
function renderUserChoices(username){
	//get user id from the results/usename page
	$.get("/database/"+username, function (response_data){
		console.log("user data length is "+response_data.length)
		//if the user does not exist
		if (response_data.length<1) {
			$(".resultList").html("User has no data");
			return;
		} else {
			//grab the list of choices from the user data
			var userData = response_data;
			var choicesIndex = userData[0].restuarants;
			//need to grab template and append to parent next

			template = _.template($("#choiceDisplay-template").html());
			choiceList = choicesIndex.map(function(choice){
				return template(choice);
			});
		
			//clear existing content
			$(".resultList").html("");
			//append new full choice list to the result display
			$(".resultList").html(choiceList);
		}
	})//end of get /database
};//end of renderUserchoice
 
	//onClick function when "X" delete option
	function deleteOption(context){
		var username = "tester2";
		//take id of the bottom for the option
		var optionID = $(context).data()._id;
		console.log("optionID:"+optionID);
		console.log("type of optionID:"+typeof(optionID));
		//send an AJAX delete request to backend
		$.ajax({
			url:'/database/'+username+'/'+optionID,
			type:'DELETE',
			data: {_id: optionID},
			//if DELETE successful, re-render all options
			success: function(res)
			{
				console.log("delete is successful")
				renderUserChoices(username);
			} //end of success
		});//end of ajax request
	}//end of deleteOption

$(document).ready(function(){

	//will make grabbing of username dynamic
//append existing data
	var username = "tester2"
	renderUserChoices(username);	

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
		$.post("/database/"+username, JSON.parse(newOptionInJson))
			.done(function(res){
			renderUserChoices(username);		
		}) //end of post
	}) //end of onClick



})//end of doc.ready


