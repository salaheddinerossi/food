import { ObjectId } from "mongodb";
import Commande from "../models/commande.js";
import Food from "../models/food.js";
import Resturant from "../models/resturant.js";
import User from '../models/user.js'

export const createCommande = async (req,res) => { 
    //get the date 
    const {address,quantitie,clientId,productId} = req.body ; 
    const product = await Food.findById(new ObjectId(productId))
    const resturantId = product.resturantId;
    const resturant  = await Resturant.findByIdAndUpdate(resturantId)
    const resturantName = resturant.name;
    const ville = resturant.ville
    const employeeId = new ObjectId(product.employeeId) 
    const user = await User.findById(employeeId);

    const email = user.email

    const price = product.price;
    const state = "pending"
    //check product state 
    if (product.state!=true) return res.status(400).send('product is not availble   ')
    // create commande
    try{
        const newCommande = await Commande.create({
            address:address,
            quantitie:quantitie,
            clientId:clientId,
            productId:productId,
            resturantId:resturantId,
            price:price,
            state:state,
            resturantName:resturantName,
            ville:ville,
            emailEmployee:email
        
        })
        res.status(200).json({newCommande})
    }catch(err){
        console.log(err)
    }

}

export const showCommandes = async (req,res) => { 
    try{
        const commandes = await Commande.find();
        res.status(200).json({commandes})

    }catch(err){
        console.log(err)
    }
}

export const validCommande = async (req,res) => { 
    //get id 
    const id = req.body.id
    console.log(id)
    
    try {
        const commande = await Commande.findByIdAndUpdate(new ObjectId(id), {
            state:'valid'
        }
        )
        res.status(200).json({commande})
    }catch(err){
        console.log(err)
    }
}

export const cancelCommande = async (req,res) => { 
        //get id 
        const id = req.body.id
    
        try {
            const commande = await Commande.findByIdAndUpdate(new ObjectId(id), {
                state:'valid'
            }
            )
        res.status(200).json({commande})

        }catch(err){
            console.log(err)
        }
    
}

export const stats = async (req,res) => {

    /* const commande = await Commande.count()
    console.log(commande)
    res.sendStatus(200)*/

    /*var d = new Date();
    d.setMonth(d.getMonth() - 1); //1 month ago
    const lm = (await Commande.find({createdAt:{$gte:d}})).length;
    console.log(lm)*/

    /*const lw = (await Commande.find({
        createdAt: {
            $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
        }
    
    })).length
    console.log(lw)*/

    /*const NumberOfProducts = await Food.count();
    console.log(NumberOfProducts);*/


   /* const revenue = await Commande.aggregate(
        [
            
            {$match:{}},
            {$group:{_id:"" ,total:{$sum :{ $multiply: [ "$price", "$quantitie" ] }}}}
        ]
    )
    console.log(revenue[0].total)*/


    /*const revenue = await Commande.aggregate(

        [
            
            {$match:{
                createdAt: {
                    $gte: new Date(new Date() - 30 * 60 * 60 * 24 * 1000)
                }
        
            }},
            
            {$group:{_id:"" ,total:{$sum :{ $multiply: [ "$price", "$quantitie" ] }}}}
        ]
    )
    console.log(revenue[0].total)*/

    /*const revenue = await Commande.aggregate(
        [
            
            {$match:{}},
            {$group:{_id:"$productId" ,total:{$sum :{ $multiply: [ "$price", "$quantitie" ] }} ,seles:{$sum : "$quantitie"}}}
        ]
    )

    console.log(revenue)*/

        /*const resturants = await Resturant.count();
        console.log(resturants)*/

    

    /*const resturantMonth = (await Resturant.find({
        createdAt: {
            $gte: new Date(new Date() - 30 * 60 * 60 * 24 * 1000)
        }
    
    })).length
    console.log(resturantMonth)*/

     /*const resturantWeek = (await Resturant.find({
        createdAt: {
            $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
        }
    
    })).length
    console.log(resturantWeek)*/

    /*const resturants = await Commande.aggregate(
        [
            {$match:{}},
            {$group:{_id:"$resturantName" ,total:{$sum :{ $multiply: [ "$price", "$quantitie" ] }} ,count: { $sum: 1 }}}
        ]
    )
    console.log(resturants)*/
    

    /*const resturants = await Commande.aggregate(
        [
            {$match:{}},
            {$group:{_id:"$ville" ,total:{$sum :{ $multiply: [ "$price", "$quantitie" ] }} ,count: { $sum: 1 } }}
        ]
    )
    console.log(resturants)*/

    const resturants = await Commande.aggregate(
        [
            {$match:{}},
            {$group:{_id:"$emailEmployee" ,total:{$sum :{ $multiply: [ "$price", "$quantitie" ] }} ,count: { $sum: 1 } }}
        ]
    )
    console.log(resturants)





}
