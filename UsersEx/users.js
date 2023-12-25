const yargs = require('yargs');
const uniqid = require('uniqid');
const fs = require('fs');
const chalk = require('chalk')

const readUsers = function () {
    try {
        const usersData = fs.readFileSync('users.json', 'utf8');
        const parsedUsers = JSON.parse(usersData);
        return parsedUsers;

    } catch (e) {
        return [];
    }

}

const writeUsers = function (users) {
    fs.writeFileSync('users.json', JSON.stringify(users))
}
const addUser = function (name, email, password) {
    const users = readUsers();
    const newUser = {
        id: uniqid(),
        name: name,
        email: email,
        password: password
    }
    users.push(newUser);
    console.log(users)
    writeUsers(users);
    console.log(chalk.green.inverse(`New user created! with the following data:\n ${JSON.stringify(newUser)}`));
}
const deleteUser = function (id) {
    const users = readUsers();
    const updatedUsersList = users.filter((user) => user.id !== id);
    if (users.length > updatedUsersList.length) {
        writeUsers(updatedUsersList);
        console.log(chalk.red.inverse('User deleted'));

    } else {
        console.log(chalk.red.inverse("User not found !!"))
    }

}
const updateUser = function (id, name, email, password) {
    const users = readUsers();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex >= 0) {
        if (name) {
            users[userIndex].name = name;
        } else if (email) {
            users[userIndex].email = email;
        } else if (password) {
            users[userIndex].password = password
        }
        writeUsers(users);
        console.log(chalk.green.inverse('User updated:', users[userIndex]));

    }
    else {
        console.log(chalk.red.inverse('User not found'));
    }

}
const readUser = function(id){
    const users = readUsers();
    const user = users.find((user)=>user.id === id);
    if(user){
        console.log('User found:', user)
        return user;
    }
    else{
        console.log(chalk.red(`No User with the id ${id}`));
    }
}
module.exports = {
    addUser,
    readUsers,
    writeUsers,
    deleteUser,
    updateUser,
    readUser
}