
function addIntStringMethod(str) {

    var sum = 0;
    var replacedCharacters = str.replace(/\n/g, ",");
    var splitedString = replacedCharacters.split(",")

    for (var i = 0; i < splitedString.length; i++) {

        if (str === '') {
            return 0;
        }
        else if (/,\n/g.test(str) === true) {
            return new Error(`we cant have two separators next to each other!`);
        }
        else if (/\/\//g.test(str) === true) {
            return delimiters(str, splitedString);
        }
        else if (splitedString[i] < 0) {
            var message = `Negative numbers are not allowed: ${splitedString.filter((element) => element < 0)}`
            return new Error(message);
        }
        sum += Number(splitedString[i])

    }
    return sum;
}

function delimiters(str, splitedString) {
    var delimiter = splitedString[0][2];
    return splitedString[1].split(delimiter).reduce((a, b) => Number(a) + Number(b));
}

console.log(addIntStringMethod(''));
console.log(addIntStringMethod('1,2'));
console.log(addIntStringMethod('785,9087,5653'));
console.log(addIntStringMethod('1\n2,3'));
console.log(addIntStringMethod('1,\n'));
console.log(addIntStringMethod('//;\n1;2'));
console.log(addIntStringMethod('-9,-0'));