import express from 'express'
import { cancelCommande, createCommande, showCommandes, validCommande } from '../controllers/commande.js';


const commandeRouter = express.Router()

commandeRouter.post('/create',createCommande)
commandeRouter.get('/',showCommandes )
commandeRouter.post('/valid' , validCommande)
commandeRouter.post('/cancel', cancelCommande)

export default commandeRouter; 
