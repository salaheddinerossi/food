import express from "express"; 
import { createFood, showFood, switchStateFood, updateFood } from "../controllers/food.js";
import { auth, authEmpolyee } from "../middleware/user.js";

const foodRoutrer = express.Router();

foodRoutrer.post('/create',authEmpolyee, createFood)
foodRoutrer.get('/',authEmpolyee, showFood)
foodRoutrer.patch('/',auth , updateFood)
foodRoutrer.patch('/switch',authEmpolyee,switchStateFood)

export default foodRoutrer ; 