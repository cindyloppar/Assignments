
1. Find the last element of a list.

Example:

last( [1,2,3,4] ) // => 4

last( "xyz" ) // => z

last( 1,2,3,4 ) // => 4
2. Correct this code, so that the greet function returns the expected value.

function Person(name){ this.name = name; }

Person.prototype.greet = function(otherName){ return "Hi " + otherName + ", my name is " + name; }
3. Write a function named numbers that returns true if all the parameters it is passed are of the Number type. Otherwise, the function should return false. The function should accept any number of parameters.

Example usage:

numbers(1, 4, 3, 2, 5); // true

numbers(1, "a", 3); // false

numbers(1, 3, NaN); // true
4. Complete the solution so that it returns true if it contains any duplicate argument values. Any number of arguments may be passed into the function. The solution should implement the most optimal algorithm possible.

solution(1, 2, 3) // returns false

solution(1, 2, 3, 2) // returns true

solution('1', '2', '3', '2') // returns true

The array values passed in will only be strings or numbers. The only valid return values are true and false.
