import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import generator from 'generate-password'

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
        const token = jwt.sign({email:existingUser.email ,id:existingUser._id },'test',{expiresIn:'2h'});
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

    const result = await User.create({email:email,password:generatedPassword,firstName:firstName,lastName:lastName,type:type ,address:address })
    console.log(result)
    // create token 

    const token = jwt.sign({email:result.email,id:result._id},'test',{expiresIn:'2h'})
    console.log(result , token , generatedPassword);

    res.status(200).json({result,token})


    }catch(err){
        console.log(err)
    }

}

// getting all the users 
export const getUsers = async (req,res) => {
    try {
        const empolyees = await User.find();

        res.status(200).json(empolyees)
        
    }catch(error){
        
        res.status(400).json({message : error.message})

    }
}