import express from 'express' ;

import { signin, newaccount , getUsers, switchStateUser } from '../controllers/user.js';
import { authAdmin } from '../middleware/user.js';

const router = express.Router();

router.post('/signin' , signin);
router.post('/newaccount' , newaccount);
router.get('/',authAdmin , getUsers);
router.post('/state' , switchStateUser)

export default router;