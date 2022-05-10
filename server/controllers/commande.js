import { ObjectId } from "mongodb";
import Commande from "../models/commande.js";
import Food from "../models/food.js";

export const createCommande = async (req,res) => { 
    //get the date 
    const {address,quantitie,clientId,productId} = req.body ; 
    const product = await Food.findOne(new ObjectId(productId))
    console.log(product);
    const resturantId = product.resturantId;
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
            state:state
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

    var d = new Date();
    d.setMonth(d.getMonth() - 1/4); //1 month ago
    const lm = (await Commande.find({createdAt:{$gte:d}})).length;
    console.log(lm)



}
