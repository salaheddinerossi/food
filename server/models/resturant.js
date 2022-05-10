import mongoose from 'mongoose';

const resturantSchema = mongoose.Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    ville:{type:String,required:true},
    numberOfProducts:{type:Number,required:true},
    state:{type:Boolean,required:true},
    image:{type:String,required:true},
    employeeId:{type:String,required:true},
    id:{type:String}
})

export default mongoose.model('Resturant' , resturantSchema)