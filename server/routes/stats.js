import express from 'express';
import { addressStats, employeeStats, foodStats, resturantStats } from '../controllers/stats.js';

const statsRouter = express.Router();

statsRouter.get('/food' , foodStats)
statsRouter.get('/resturant' , resturantStats)
statsRouter.get('/address' , addressStats)
statsRouter.get('/employee' , employeeStats)

export default statsRouter ;