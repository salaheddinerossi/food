import express from "express"
import bodyParser from 'body-parser'
import mongoose from "mongoose"
import cors from 'cors';
import userRouter from './routes/user.js';
import resturantRouter from "./routes/resturant.js";
import foodRoutrer from "./routes/food.js";
import commandeRouter from "./routes/commande.js";


const app = express();

app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())


app.use('/user', userRouter)
app.use('/food', foodRoutrer)
app.use('/resturant', resturantRouter)
app.use('/commande',commandeRouter)





const PORT = 5000; 
const CONNECTION_URL ="mongodb://localhost:27017";





app.listen(PORT)

mongoose.connect(CONNECTION_URL,
    {useNewUrlParser :true},
    () => {
        console.log("connected to db")
    }
)