function argumentStrings(string, str) {

    for (var i = 0; i < string.length; i++) {

        if (string[i] === str[i]) {
            return true;
        } else {
            return false;
        }
    }
}
console.log(argumentStrings('Perfect Practice Makes Perfect', 'Perfect'));
console.log(argumentStrings('We should have a growth Mindset', 'Fixed'));