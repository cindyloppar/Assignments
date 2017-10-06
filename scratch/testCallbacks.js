//function sayHello(){console.log("Hello");}

//function callAfter2Seconds(cb){ timeout(cb, 2000); }

function beginningOfTheDayTimestamp(){
console.log("beginning of day");
  return new Date("06 Oct 2017").getTime();
}

function currentTimestamp(){
console.log("beginning of current timestamp");
  return new Date().getTime();
}

function callAfter2Seconds(callback){ 
console.log("beginning of call after 2 seconds");
	var beginTimestamp = callback(); 
console.log("result of calling callback, which in this case is currentTimestamp", beginTimestamp);
	setTimeout(function()
	{
console.log("beginning of the anonymous function that was passed into setTimeout");
			var endTimestamp = new Date().getTime(); 
                        var secondsDifference = endTimestamp - beginTimestamp;
			console.log(`The difference is ${secondsDifference} when executing ${callback.name}`);
	}, 2000); 
}

console.log("Going to call callAfter2Seconds");
//callAfter2Seconds(currentTimestamp);
callAfter2Seconds(beginningOfTheDayTimestamp);
