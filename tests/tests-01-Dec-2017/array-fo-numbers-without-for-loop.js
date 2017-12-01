function arrayOfNumbers(arr, num, string) {
   var newArr = []
  
    if (string === "LessThan" && arr < num) {
                newArr.push(arr);
                
            }
            return newArr;
}

console.log(arrayOfNumbers([1, 2, 3, 4, 5, 6, 7], 3, "GreaterOrEqual"));
console.log(arrayOfNumbers([1, 2, 3, 4, 5, 6, 7], 5, "LessThan"));