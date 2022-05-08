import express from "express"
import bodyParser from 'body-parser'
import mongoose from "mongoose"
import cors from 'cors';
import userRouter from './routes/user.js';
import retuarantRouter from "./routes/resturant.js";


const app = express();

app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())


app.use('/user', userRouter)
app.use('/resturant', retuarantRouter)






const PORT = 5000; 
const CONNECTION_URL ="mongodb://localhost:27017";





app.listen(PORT)

mongoose.connect(CONNECTION_URL,
    {useNewUrlParser :true},
    () => {
        console.log("connected to db")
    }
)