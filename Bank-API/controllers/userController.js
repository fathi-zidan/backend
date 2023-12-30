import STATUS_CODE from "../constants/statusCode.js";
import { readUsersFromFile, writeUsersToFile } from "../models/userModel.js";
import { v4 as uuidv4 } from 'uuid'

export const menu = async (req, res, next) => {
    try {
        const menuOptions = [
            'Get all users ==> /All',
            'Get specific user by ID ==> /:id ',
            'Add a new user ==> /addUser',
            'Deposit cash to a user ==> /deposit',
            'Withdraw money from a user ==> /:id/withdraw',
            'Update a user\'s credit ==> /:id/updateCredit',
            'Transfer money between users ==> /:from/trans/:to',
            'Filter users by cash and credit ==> /filterUsers?minCash=<value>&maxCash=<value>&minCredit=<value>&maxCredit=<value>',
        ];
        res.status(STATUS_CODE.OK).send(menuOptions);
    } catch (e) {
        next(e);
    }
}
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await readUsersFromFile();
        res.send(users);

    } catch (e) {
        next(e);

    }
}

export const getSpecificUser = async (req, res, next) => {
    try {
        const users = await readUsersFromFile();
        const userId = req.params.id;
        const user = users.find((user) => user.id == userId);
        if (user) {
            res.send(user);
        } else {
            res.status(STATUS_CODE.NOT_FOUND);
            throw new Error("User was not found");
        }

    } catch (e) {
        next(e);
    }
}

export const createUser = async (req, res, next) => {
    try {
        const { name, cash = 0, credit = 0 } = req.body;

        if (!name || !cash || !credit) {
            res.status(STATUS_CODE.BAD_REQUEST).send("your missing a required field for creating a user");
            return;
        }
        const users = await readUsersFromFile();
        const id = uuidv4();
        const isUnique = users.every((user) => user.id !== id);

        if (!isUnique) {
            res.status(STATUS_CODE.CONFLICT).send("Generated ID already exists. Please try again.");
            return;
        }

        const newUser = {
            id: id,
            name,
            cash,
            credit,
            isActive: true,
        }

        users.push(newUser);
        writeUsersToFile(users);
        res.status(STATUS_CODE.CREATED).send(newUser);

    } catch (e) {
        next(e);
    }
}

export const cashDeposit = async (req, res, next) => {
    try {
        const { id, amount } = req.body;
        if (!id || !amount) {
            res.status(STATUS_CODE.BAD_REQUEST).send("Both Amount and Id are required for deposit")
        }
        const users = await readUsersFromFile();
        const user = users.find((user) => user.id == id);
        if (!user) {
            res.status(STATUS_CODE.NOT_FOUND).send(`User with the id ${id} does not exist`);
        }
        user.cash += amount;
        writeUsersToFile(users);
        res.status(STATUS_CODE.OK).send(user);
    } catch (e) {
        next(e);
    }
}

export const withdrawMoney = async (req, res, next) => {
    try {

        const id = req.params.id;
        const { amount } = req.body;

        if (!id || !amount || amount < 0) {
            res.status(STATUS_CODE.BAD_REQUEST).send("Invalid request check the amount ");
            return;
        }
        const users = readUsersFromFile();
        const user = users.find((user) => user.id == id);
        if (!user) {
            res.status(STATUS_CODE.NOT_FOUND).send(`The User with the id "${id}" was not found.`);
            return;
        }
        if (amount > user.cash + user.credit) {
            res.status(STATUS_CODE.BAD_REQUEST).send("Not enough funds for withdrawal.");
            return;
        }
        if (amount <= user.cash) {
            user.cash -= amount;
        } else {
            const remainingAmount = amount - user.cash;
            user.cash = 0;
            user.credit -= remainingAmount;
        }
        writeUsersToFile(users);
        res.status(STATUS_CODE.OK).send(user);
    } catch (e) {
        next(e);
    }


}

export const updateCredit = async (req, res, next) => {
    try {

        const id = req.params.id;
        const { credit } = req.body;

        if (!id || !credit || credit < 0) {
            res.status(STATUS_CODE.BAD_REQUEST).send("Invalid request check the credit you entered! ");
            return;
        }
        const users = readUsersFromFile();
        const user = users.find((user) => user.id == id);
        if (!user) {
            res.status(STATUS_CODE.NOT_FOUND).send('User is not found');
            return;
        }
        user.credit = credit;
        writeUsersToFile(users);
        res.status(STATUS_CODE.OK).send(user);
    } catch (e) {
        next(e);
    }
}
export const transferMoney = async (req, res, next) => {
    try {

        const { from, to } = req.params;
        const { amount } = req.body;

        if (!from || !to) {
            res.status(STATUS_CODE.BAD_REQUEST).send("Invalid request missing from or to ! ");
            return;
        }

        const users = await readUsersFromFile();
        const sender = users.find((user) => user.id == from);
        const receiver = users.find((user) => user.id == to);

        if (!sender || !receiver) {
            res.status(STATUS_CODE.NOT_FOUND).send('User is not found');
            return;
        }

        if (amount > sender.cash + sender.credit) {
            res.status(STATUS_CODE.BAD_REQUEST).send('You do not have enough money in your account');
            return;
        }
        if (amount < sender.cash) {
            sender.cash -= amount;
            receiver.cash += amount;
        } else {
            const remainingAmount = amount - sender.cash;
            sender.cash = 0;
            sender.credit -= remainingAmount;
            receiver.cash += amount;
        }
        writeUsersToFile(users);
        res.status(STATUS_CODE.OK).send({ sender, receiver });
    } catch (e) {
        next(e);
    }
}

export const filterUsers = async (req, res, next) => {
    try {
        const { minCash, maxCash, minCredit, maxCredit } = req.query;
        
        // console.log("minCash:", minCash);
        // console.log("maxCash:", maxCash);
        // console.log("minCredit:", minCredit);
        // console.log("maxCredit:", maxCredit);
        const users = await readUsersFromFile();
        let filterUsers = users
        if (minCash !== undefined) {
            filterUsers = filterUsers.filter(user => user.cash >= parseInt(minCash));
        }
        if (maxCash !== undefined) {
            filterUsers = filterUsers.filter(user => user.cash <= parseInt(maxCash));
        }
        if (minCredit !== undefined) {
            filterUsers = filterUsers.filter(user => user.credit >= parseInt(minCredit));
        }
        if (maxCredit !== undefined) {
            filterUsers = filterUsers.filter(user => user.credit <= parseInt(maxCredit))
        }
        res.status(STATUS_CODE.OK).send(filterUsers);

    } catch (e) {
        next(e);
    }
}

