import mongoose from 'mongoose';

const resturantSchema = mongoose.Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    numberOfProducts:{type:BigInt,required:true},
    id:{type:String}
})

export default mongoose.model('Resturant' , resturantSchema)