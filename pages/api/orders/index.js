import { createOrderWithUser,getUserOrders}  from "../../../lib/orderService";
import prisma from "../../../lib/prisma";

console.log(prisma)


export default async function handler(req,res) {

    if(req.method=="POST"){

        try{
            const{userId, amount,walletAddress} = req.body

            if (!userId||!amount||!walletAddress){
                return res.status(400).json({
                    success:false,
                    message:"Missing required fields: userId, amount, walletAddress"
                })
            }

            if(isNaN(amount)||amount<=0){
                return res.status(400).json({
                    success: false,
                    message: "Amount must be a positive number"

                })
            }

            const result = await createOrderWithUser(userId,amount,walletAddress);

            if(result.success){
                return res.status(201).json({
                    success: true,
                    message: "Order created successfully",
                    data: result.data
                })
            }
            else{
                return res.status(400).json({
                    success: false,
                    message: "Failed to create order",
                    error: result.error
                })
            }


            



        }

        catch(err){

            console.error("Error creating order:", err);

            return res.status(500).json({
                success: false,
                message:  "Failed to create order , server error",
                error: err.message

            }

            )
            
            

        }


    }
    else if (req.method=="GET"){
        try{

            const {userId} = req.query

            if(!userId){
                return res.status(400).json({
                    success:false,
                    message: "Missing required query parameter: userId"
                })
            }

            const result = await getUserOrders(userId);

            if(result.success){
                return res.status(200).json({
                    success:true,
                    data: result.data
                })
            }
            else{
                return res.status(400).json({
                    success:false,
                    message: "Failed to fetch orders",
                    error: result.error
                })
            }

        }
        catch(err){
            console.error("Error fetching orders:", err);

            return res.status(500).json({
                success:false,
                message: "Failed to fetch orders, server error",
                error: err.message
            })
        }
    }
    else{

        res.setHeader("Allow",["POST","GET"])

        return res.status(405).json({
            success:false,
            message: "Method not allowed"
        })

    }
    
}