const fs = require('fs');

fs.writeFileSync('MyFile.txt',"hello my name is fathi");// writting in the file
fs.copyFileSync('MyFile.txt','MyFile2.txt'); // copy the file
fs.renameSync('MyFile2.txt','Hello.txt'); //renaming
const MyFiles = fs.readdirSync(__dirname); //__dirname is special variable that gives the current dir
console.log(MyFiles)
fs.mkdirSync('MyDir');
