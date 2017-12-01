
function runLength(str) {

    var output = '';
    var count = 1;

    for (var i = 0; i < str.length; i++) {
        if (str[i] === str[i + 1] && str[i] !== str[i -1]) {
            return output += 1 ;
            output.push()
        } else {
            return count + str;
        }
    }
    return output;
}
console.log(runLength("BOOKDASH"));
