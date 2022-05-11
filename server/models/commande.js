import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';


const commandeSchema = mongoose.Schema({
    address:{type:String,required:true},
    emailEmployee:{type:String,required:true},
    resturantName:{type:String,required:true},
    ville:{type:String,required:true},
    price:{type:Number,required:true},
    quantitie:{type:Number,required:true},
    state:{type:String,required:true},
    clientId:{type:String,required:true},
    productId:{type:String,required:true},
    resturantId:{type:String,required:true},
    createdAt : {type : Date ,default : new Date()},
    id:{type:String}
})

export default mongoose.model('Commande' , commandeSchema)