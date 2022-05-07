import express from 'express' ;

import { signin, newaccount , getUsers } from '../controllers/user.js';
import { authAdmin } from '../middleware/user.js';

const router = express.Router();

router.post('/signin' , signin);
router.post('/newaccount' , newaccount);
router.get('/',authAdmin , getUsers);

export default router;