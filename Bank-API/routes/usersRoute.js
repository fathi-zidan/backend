import express from "express";
import {getAllUsers,getSpecificUser,createUser,cashDeposit,withdrawMoney,updateCredit,transferMoney,menu,filterUsers} from '../controllers/userController.js'

const router = express.Router();
router.get('/', menu);
router.get('/All', getAllUsers);
router.get('/:id', getSpecificUser);
router.post('/addUser', createUser);
router.patch('/deposit', cashDeposit);
router.patch('/:id/withdraw', withdrawMoney);
router.patch('/:id/updateCredit', updateCredit);
router.patch('/:from/trans/:to', transferMoney);
router.get('/filterUsers', filterUsers);


export default router;