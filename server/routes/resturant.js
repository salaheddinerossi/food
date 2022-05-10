import express from 'express' ;
import { createResturant, showResturants, switchStateResturant, updateResturant } from '../controllers/resturant.js';
import { auth, authEmpolyee } from '../middleware/user.js';

const resturantRouter = express.Router();

resturantRouter.post('/create',authEmpolyee , createResturant)
resturantRouter.get('/',auth, showResturants)
resturantRouter.patch('/update',authEmpolyee,updateResturant)
resturantRouter.patch('/switch',authEmpolyee,switchStateResturant)

export default resturantRouter;