// const fs = require('fs');
// fs.writeFileSync('notes.txt', "My name is fathi zidan");
// fs.appendFileSync('notes.txt',", I am 23 years old");

// const addFunction = require('./utils.js')
// const sum = addFunction(4,-1);
// console.log(sum)

// const validator = require('validator')
// console.log(validator.isEmail("fathi@gmail.com"));
import { add, subtract, multiply } from './imported.js';

// const chalk = require('chalk')
// console.log(chalk.bold.blue.bgRed.inverse("success!"));

// const getNotes = require('./notes.js');
// console.log(getNotes("fathi"));

console.log(add(5, 3));      
console.log(subtract(10, 4)); 
console.log(multiply(2, 6));

import chalk from 'chalk';
console.log(chalk.bold.blue.bgRed.inverse("success!"));


