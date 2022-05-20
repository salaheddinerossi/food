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
        const empolyees = await User.find();
        //extract _id from the object
        const users = [];
        empolyees.forEach(empolyee => {
            users.push({
                _id:empolyee._id,
                firstName:empolyee.firstName,
                lastName:empolyee.lastName,
                email:empolyee.email,
                type:empolyee.type,
                address:empolyee.address,
                password:empolyee.password,
                state:empolyee.state
            })
        });        
        res.status(200).json(empolyees)
        
    }catch(error){
        
        res.status(400).json({message : error.message})

    }
}

//active user 

export const updateUser = async (req,res) => {
    //get the user
    const { firstName,lastName,type,email,address,password,state,id} = req.body;
    //change the content 
    const updateUser = await User.findByIdAndUpdate({_id: new ObjectId(id)},{
        firstName:firstName,
        lastName:lastName,
        email:email,
        type:type,
        address:address,
        password:password,
        state:state,
        _id:id,
    })

    // response 
    res.status(200).send('user updated')

}

export const switchStateUser = async (req,res) => {
    const id = new ObjectId(req.body.id);
    const selectedUser = await User.findOne(id);
    const currentState = selectedUser.state;
    console.log(currentState)
    const switchState = await User.findOneAndUpdate(id,{state:!currentState})
    res.status(200).send(switchState)
}