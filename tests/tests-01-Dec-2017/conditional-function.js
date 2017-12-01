
function conditionalFunction(int) {

    if (int > 0) {
        return "And";
    } else if (int < 0) {
        return "Or";
    } else {
        return "None";
    }
}
console.log(conditionalFunction(1));
console.log(conditionalFunction(-1));
console.log(conditionalFunction("a"));