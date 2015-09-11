var _ = require("underscore");

var database = 
[{"_id":"55f218478b7d44de7ab1a1e1","userName":"tester1","password":"ok","email":"ok","__v":0,"restuarants":[{"optionName":"Sushirittos","score":11,"_id":"55f218478b7d44de7ab1a1e4","criteria":{"food":5,"service":6}},{"optionName":"unhealthyPlace","score":10,"_id":"55f218478b7d44de7ab1a1e3","criteria":{"food":6,"service":4}},{"optionName":"decentPlace","score":6,"_id":"55f218478b7d44de7ab1a1e2","criteria":{"food":1,"service":5}}]},{"_id":"55f218478b7d44de7ab1a1e5","userName":"tester2","password":"ok","email":"ok","__v":0,"restuarants":[{"optionName":"Sushirittos2","score":11,"_id":"55f218478b7d44de7ab1a1e8","criteria":{"food":5,"service":6}},{"optionName":"unhealthyPlace2","score":10,"_id":"55f218478b7d44de7ab1a1e7","criteria":{"food":6,"service":4}},{"optionName":"decentPlace2","score":6,"_id":"55f218478b7d44de7ab1a1e6","criteria":{"food":1,"service":5}}]}];
/*console.log(database);
*/

var userName = "tester1";

userMatched = _.find(database, function(userMatched){
	return userMatched.userName ===userName;
}) 

//
console.log(userMatched);

console.log(userMatched.restuarants);