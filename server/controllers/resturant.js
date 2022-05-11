import Resturant from "../models/resturant.js";
import { ObjectId } from 'mongodb';


export const createResturant = async (req,res) => { 
    const {name, address,ville,image} = req.body;

    const employeeId= req.user._id

    //check if restuarant exists
    const existingResturant = await Resturant.findOne({name})
    if(existingResturant) return res.status(400).send('resturant exist');
    //create new resturant 
    const resturant = await Resturant.create({name:name,address:address,numberOfProducts:0,state:true,ville:ville,employeeId:employeeId,image:image})
    //send response 
    res.status(200).json({resutl:resturant})
}

export const showResturants = async (req,res) => {
    try{
        const resturants = await Resturant.find();
        res.status(200).json({resturants})
    }catch(err){
        console.log(err)
    }

}
export const updateResturant = async (req,res) => {
    try{
    //get resturant 
    const {name,address,image,id,ville} = req.body; 
    //updare the resturant 
    const updatedResturant = await Resturant.findByIdAndUpdate({_id: new ObjectId(id)},{
        name:name,
        address:address,
        image:image,
        ville:ville,
        _id:id
    })
    //response 
    res.status(200).json({updatedResturant})
    }catch(err){
        console.log(err)
    }
}

export const switchStateResturant = async (req,res) => {
    const id = new ObjectId(req.body.id);

    const selectedResturant = await Resturant.findOne(id);
    
    if (selectedResturant.state== true){
        const switchState = await Resturant.findByIdAndUpdate(id,{
            state:false
        })
    }
    else{
        const switchState = await Resturant.findByIdAndUpdate(id,{
            state:true
        })
    }
    res.status(200).send(selectedResturant)
}