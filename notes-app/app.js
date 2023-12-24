// const fs = require('fs');
// fs.writeFileSync('notes.txt', "My name is fathi zidan");
// fs.appendFileSync('notes.txt',", I am 23 years old");

// const addFunction = require('./utils.js')
// const sum = addFunction(4,-1);
// console.log(sum)

// const validator = require('validator')
// console.log(validator.isEmail("fathi@gmail.com"));

const chalk = require('chalk')
console.log(chalk.bold.blue.bgRed.inverse("success!"));

const getNotes = require('./notes.js');
console.log(getNotes("fathi"));


