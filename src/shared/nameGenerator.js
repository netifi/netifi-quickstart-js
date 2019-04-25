// For generating variable identities in order to easily tell if messages are coming from this application instance or another
const alphabet = [
    "Alfa", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliet", "Kilo", "Lima", "Mike", "November",
    "Oscar", "Papa", "Quebec", "Romeo", "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "X-Ray", "Yankee", "Zulu"
];

const numbers = [
    "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"
];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function generateName(){
    return alphabet[getRandomInt(25)] + '-' + numbers[getRandomInt(9)] + '-' + numbers[getRandomInt(9)] + '-' + numbers[getRandomInt(9)];
}

module.exports = generateName;
