import Commande from "../models/commande.js"
import Food from "../models/food.js"
import Resturant from "../models/resturant.js"

export const foodStats = async (req,res) => {

    //number of sales 
    const sales = await Commande.count();
    // number of sales last month 
    const lastMonthSales = (await Commande.find({
        createdAt: {
            $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
        }
    
    })).length
    
    // number of sales last month 
    const lastWeekSales = (await Commande.find({
        createdAt: {
            $gte: new Date(new Date() - 30 * 60 * 60 * 24 * 1000)
        }
    
    })).length

    // number of products 
    const NumberOfProducts = await Food.count();

    //last month revenue 
    const revenueLastMonth = await Commande.aggregate(

        [
            
            {$match:{
                createdAt: {
                    $gte: new Date(new Date() - 30 * 60 * 60 * 24 * 1000)
                }
        
            }},
            
            {$group:{_id:"" ,total:{$sum :{ $multiply: [ "$price", "$quantitie" ] }}}}
        ]
    )

    //total revenue 
    const totalRevenue = await Commande.aggregate(
        [
            
            {$match:{}},
            {$group:{_id:"" ,total:{$sum :{ $multiply: [ "$price", "$quantitie" ] }}}}
        ]
    )
    
    //products stats

    const revenueByProducts = await Commande.aggregate(
        [
            
            {$match:{}},
            {$group:{_id:"$productId" ,total:{$sum :{ $multiply: [ "$price", "$quantitie" ] }} ,seles:{$sum : "$quantitie"}}}
        ]
    )

    //response 
    const totale = revenueByProducts.length
    console.log(totale)
    const page = parseInt(req.query.page || "1")
    console.log(revenueByProducts)

    const pageSize = 2;
    const paginate = (array, pageSize, page) => {
        return array.slice((page - 1) * pageSize, page * pageSize);
      }
      console.log(page)
    const productsPaginated = paginate(revenueByProducts, pageSize, page);
      

    res.status(200).json({
        sales,lastMonthSales,lastWeekSales,NumberOfProducts,revenueLastMonth:revenueLastMonth[0].total,totalRevenue:totalRevenue[0].total,revenueByProducts:productsPaginated,totale:Math.ceil(totale/2)
    })


}

export const resturantStats = async (req,res) => {
    //number of resrurants 
    const resturantsNumber = await Resturant.count();

    //number of resturants azdded last month 
    const resturantMonth = (await Resturant.find({
        createdAt: {
            $gte: new Date(new Date() - 30 * 60 * 60 * 24 * 1000)
        }
    
    })).length

    //resturants added last week
    const resturantWeek = (await Resturant.find({
        createdAt: {
            $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
        }
    
    })).length
    //resturant stats 
    const resturantsStats = await Commande.aggregate(
        [
            {$match:{}},
            {$group:{_id:"$resturantName" ,total:{$sum :{ $multiply: [ "$price", "$quantitie" ] }} ,count: { $sum: 1 }}}
        ]
    )

    //response 

    res.status(200).json({
        resturantsNumber,resturantMonth,resturantWeek,resturantsStats
    })

}

export const addressStats = async (req,res) => {
    // stats by address
    const addressStats = await Commande.aggregate(
        [
            {$match:{}},
            {$group:{_id:"$ville" ,total:{$sum :{ $multiply: [ "$price", "$quantitie" ] }} ,count: { $sum: 1 } }}
        ]
    )

    // response 
    res.status(200).json({
        addressStats
    })
    
}

export const employeeStats = async (req,res) => {
    //stats by users 
    const employeeStates = await Commande.aggregate(
        [
            {$match:{}},
            {$group:{_id:"$emailEmployee" ,total:{$sum :{ $multiply: [ "$price", "$quantitie" ] }} ,count: { $sum: 1 } }}
        ]
    )

    //resonse 
    res.status(200).json({
        employeeStates
    })
}