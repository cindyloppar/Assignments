
function addIntStringMethod(str) {
var sum = 0;
   
    var replace = str.replace(/ \n/g,",");

    var splitedString = replace.split(",")
   

    for (var i = 0; i < splitedString.length; i++) {
        if(str === ''){
            return 0;
        }else if (/,\n/g.test(str) === true){
            return new Error (`we cant have two separators next to each other!`);
        }else if(/\/\//g.test(str) === true){
            return delimiters(str, splitedString);
        }
sum += parseInt(splitedString[i])
        
        if (splitedString.length === 0) {
            return 0;
        }
    }
    /*sum = splitedString.reduce(function (a, b) {
        return parseInt(a) + parseInt(b);

    });*/

    return sum;
}

console.log(addIntStringMethod(''));
console.log(addIntStringMethod('1,2'));
console.log(addIntStringMethod('785,9087,5653'));
console.log(addIntStringMethod('1\n2,3'));
console.log(addIntStringMethod('1,\n'));
console.log(addIntStringMethod('//;\n1;2'));
console.log(addIntStringMethod('-9,-0'));