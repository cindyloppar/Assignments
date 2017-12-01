function arrayOfNumbers(arr, num, string) {
    var newArr = []

    if (string === "LessThan" && arr < num) {

        var filtered = arr.filter(function (numbers) {
            return numbers < num;

        })
    }
    else if (string === "GreaterOrEqual" && arr < num) {

        var filtered = arr.filter(function (numbers) {
            return numbers >= num;

        })
    }


    return filtered;
}

console.log(arrayOfNumbers([1, 2, 3, 4, 5, 6, 7], 3, "GreaterOrEqual"));
console.log(arrayOfNumbers([1, 2, 3, 4, 5, 6, 7], 5, "LessThan"));