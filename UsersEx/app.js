const fs = require('fs');
const yargs = require('yargs');
const uniqid = require('uniqid');
const users = require('./users.js');
const chalk = require('chalk')

yargs.command({
    command: 'create',
    describe: "Create a new user",
    builder: {
        name: {
            description: 'User name',
            demandOption: true,
            type: 'string'
        },
        email: {
            description: 'User email',
            demandOption: true,
            type: 'string'

        },
        password: {
            description: 'User password',
            type: 'string'

        }
    },
    handler: function (argv) {
        users.addUser(argv.name, argv.email, argv.password);
        // console.log(yargs.argv)
    }
});

yargs.command({
    command: 'delete',
    describe: "Delete a user by given id",
    builder: {
        id:
        {
            describe: 'User ID',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        users.deleteUser(argv.id)
    }
});

yargs.command({
    command:'update',
    describe:"Update the information of an existing user",
    builder:{
        id :{
            describe: 'User ID',
            demandOption:true,
            type:'string'
        }
    },
    handler: function(argv){
        users.updateUser(argv.id,argv.name,argv.email,argv.password)

    }
})

yargs.parse();