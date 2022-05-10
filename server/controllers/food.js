import Food from "../models/food.js"
import { ObjectId } from 'mongodb';
import Resturant from "../models/resturant.js";

export const createFood = async (req,res) => {
    try {
        const { name,resturantId,price,image}  = req.body
        const employeeId = req.user._id;
        //check if product exsits 
        const objectIdResturant = new ObjectId(resturantId)
        const existingFood = await Food.findOne({name:name , objectIdResturant })
        if (existingFood) return res.status(400).send('product already exists ! ')
        // create prouct 
        const food = await Food.create({name:name,resturantId:resturantId,price:price,state:true,numberOfSales:0,image:image,employeeId:employeeId})
        // find the resturant and add 1 
        const addOne = await Resturant.findByIdAndUpdate({_id:objectIdResturant},{
            $inc: { numberOfProducts : 1 }
        })
        //response
        res.status(200).json({food})
    }catch(err){
        console.log(err)
    }
}

export const showFood = async(req,res) => {
    try{
        const foods = await Food.find();
        res.status(200).json(foods);
    }catch(err){
        console.log(err)
    }
}
export const updateFood = async (req,res) => {
    try{
    //get resturant 
    const {price,name,state,image,id} = req.body; 
    //updare the resturant 
    const updatedFood = await Food.findByIdAndUpdate({_id: new ObjectId(id)},{
        price:price,
        name:name,
        state:state,
        image:image,
        _id:id
    })
    //response 
    res.status(200).json({updatedFood})
    }catch(err){
        console.log(err)
    }
}   

export const switchStateFood = async (req,res) => {
    const id = new ObjectId(req.body.id);
    const selectedFood = await Food.findOne(id);
    if (selectedFood.state== true){
        const switchState = await Food.findByIdAndUpdate(id,{
            state:false
        })
    }else{
        const switchState = await Food.findByIdAndUpdate(id,{
            state:true
        })
    }
    res.status(200).send(selectedFood)
}