
function arrayOfNumbers(arr, num, string) {
    var array = [];

    for (var i = 0; i < arr.length; i++) {
        if (string === "LessThan" && arr[i] < num) {
            array.push(arr[i]);

        } else if (string === "GreaterOrEqual" && arr[i] >= num) {
            array.push(arr[i]);
        }

    }
    return array;
}

console.log(arrayOfNumbers([1, 2, 3, 4, 5, 6, 7], 3, "GreaterOrEqual"));
console.log(arrayOfNumbers([1, 2, 3, 4, 5, 6, 7], 5, "LessThan"));
