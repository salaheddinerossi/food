import mongoose from 'mongoose';

const foodSchema = mongoose.Schema({
    name:{type:String,required:true},
    resturantId:{type:String,required:true},
    state:{type:Boolean,required:true},
    price:{type:Number,required:true},
    numberOfSales:{type:Number,required:true},
    image:{type:String,required:true},
    employeeId:{type:String,required:true},

    createdAt : {type : Date ,default : new Date()},
    id:{type:String}
})

export default mongoose.model('Food' , foodSchema)