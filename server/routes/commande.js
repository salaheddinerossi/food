import express from 'express'
import { cancelCommande, createCommande, showCommandes, stats, validCommande } from '../controllers/commande.js';


const commandeRouter = express.Router()

commandeRouter.post('/create',createCommande)
commandeRouter.get('/',showCommandes )
commandeRouter.post('/valid' , validCommande)
commandeRouter.post('/cancel', cancelCommande)
commandeRouter.get('/stats',stats)

export default commandeRouter; 
