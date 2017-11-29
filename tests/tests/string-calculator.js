
function addIntStringMethod(str) {

    var arr = [];
    var replace = str.replace(/(\n)|(\W)/g,"");
var sum = 0;
    var splitedString = replace.split("")
    /*var sumOfNumbers = splitedString.reduce(function (a, b) {
        return parseInt(a) + parseInt(b);

    });*/

    for (var i = 0; i < splitedString.length; i++) {
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