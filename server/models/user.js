import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    type:{type:String,required:true},
    email:{type:String,required:true},
    address:{type:String,required:true},
    password:{type:String,required:true},
    state:{type:String,required:true},
    id:{type:String}
})

export default mongoose.model('User' , userSchema)