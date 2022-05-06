import express from 'express' ;

import { signin, newaccount , getUsers } from '../controllers/user.js';

const router = express.Router();

router.post('/signin' , signin);
router.post('/newaccount' , newaccount);
router.get('/users' , getUsers);

export default router;