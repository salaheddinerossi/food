import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import generator from 'generate-password'
import { ObjectId } from 'mongodb';

//singin in 
export const signin = async(req,res) => {
    const {email,password} = req.body; 
    try {
        // check if user is exist 
        const existingUser = await User.findOne({email});
        if (!existingUser) return res.status(400).json({message:"user doesn't exist"})
        // check if password is correct 
        const isPasswordCorrect = password == existingUser.password;
        if(!isPasswordCorrect) return res.status(400).json({message:"password is not correct"});
        // create token 
        const token = jwt.sign({existingUser },'test');
        res.status(200).json({result:existingUser,token})
    }catch(err){
        console.log(err)
    }
}
//generating an account 
export const newaccount = async(req,res) => {
    try{
    const { firstName,lastName,type,email,address} = req.body;
    // check if email is taken 
    const existingUser = await User.findOne({email});
    
    if (existingUser) return res.status(400).json({message:'email is taken'});

    // generate password 

    var generatedPassword = generator.generate({
        length: 10,
        numbers: true
    });
    
    // create account in db 

    const result = await User.create({email:email,password:generatedPassword,firstName:firstName,lastName:lastName,type:type ,address:address,state:true })

    res.status(200).json({result})


    }catch(err){
        console.log(err)
    }

}

// getting all the users 
export const getUsers = async (req,res) => {
    try {
        const totale = await User.countDocuments({})
        const page = parseInt(req.query.page || "0")
        const empolyees = await User.find().limit(5).skip(5 * page);
        res.status(200).json({
            employees:empolyees,
            totale:Math.ceil(totale/5)
            })
        
    }catch(error){
        
        res.status(400).json({message : error.message})

    }
}

//active user 

export const updateUser = async (req,res) => {
    console.log(req.body.lastName)
    //get the user
    const { firstName,lastName,type,email,address,password,_id} = req.body;
    const id = new ObjectId(_id);
    const updateUser = await User.findByIdAndUpdate(id,{
        firstName:firstName,
        lastName:lastName,
        email:email,
        type:type,
        address:address,
        password:password,
        _id:id,
    })
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser)   


    // response 

}

export const switchStateUser = async (req,res) => {
    const id = new ObjectId(req.body.id);
    const currentUser = await User.findById(id)
    const state = currentUser.state;
    var newState = true; 
    if(state==false) { newState = true }
    if(state==true) { newState = false}
  
    const switchState = await User.findOneAndUpdate({_id:id},{state:newState})
    const switchedState = await User.findById(id);

    res.status(200).send(switchedState)
}

