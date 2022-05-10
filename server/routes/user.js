import express from 'express' ;

import { signin, newaccount , getUsers, updateUser, switchStateUser } from '../controllers/user.js';
import { authAdmin } from '../middleware/user.js';

const router = express.Router();

router.post('/signin' , signin);
router.post('/newaccount',authAdmin , newaccount);
router.get('/',authAdmin , getUsers);
router.patch('/update',authAdmin , updateUser)
router.patch('/switch',authAdmin , switchStateUser)


export default router;