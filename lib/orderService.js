
import prisma from "./prisma";


async function createOrderWithUser(userId,amount,walletAddress){
    try{
        const user = await prisma.user.upsert({
            where :{
                id : userId
            },

            update: {

            },
            create : {
                id : userId,
                email :`${userId}@example.com`,
                privyId: userId,
                walletAddr: walletAddress

            }

            
        })

        console.log("User is there :", user);

        const newOrder = await prisma.order.create({
            data:{
                userId: userId,
                amount: parseFloat(amount),
                walletAddr: walletAddress,
                status:"PENDING"
            }
        })

        console.log("Order created :", newOrder);
        return {
            success: true,
            data: {
                user: user,
                order: newOrder
            }
        }

        

    }

    catch(err){
        console.error("Error creating order:", err);
        return {
            success: false,
            error: err.message
        }
    }
}


async function getUserOrders(userId){

            try{
                const orders = await prisma.order.findMany({
                    where:{
                        userId: userId
                    },
                    orderBy:{
                        createdAt: "desc"

                    },
                    include:{
                        user:true
                    }
                })

                return {
                    success: true,
                    data: orders
                }

                


            }
            catch(err){
                console.error("Error fetching user orders:", err);
                return {
                    success: false,
                    error: err.message
                }
            }
        }

 async function updateOrderUTR(orderId,utrNumber,userId){
    try{
        const existingOrder = await prisma.order.findFirst({
            where : {
                id : orderId,
                userId : userId
            }
        })

        if (!existingOrder) {
            return {
                success: false,
                error: "Order not found "
            }
        }

        if(existingOrder.status !== "PENDING"){
            return {
                success: false,
                error: "Order is not pending"
            }
        }

        const updateOrder = await prisma.order.update({
            where :{
                id : orderId
            },
            data : {
                
                utrNumber : utrNumber,
                updatedAt : new Date(),

            },
            include:{
                user:true
            }
        })

        console.log("Order updated :", updateOrder.id);
        return {
            success: true,
            data : updateOrder
        }

    }

    catch(err){
        console.error("Error updating order status:", err);
        return {
            success: false,
            error: err.message
        }
    }
 }

 async function verifyUTRAndCompleteOrder(utrNumber){

    try{

        const existingOrder = await prisma.order.findFirst({
            where :{
                utrNumber : utrNumber,
                status: "PENDING"
            },
            include:{
                user:true
            }
        })

        if (!existingOrder){
            return {
                success : false,
                error : "No pending order found with this UTR number"

        
            }}
        
        const completedOrder = await prisma.order.update({
            where : {
                id : existingOrder.id
            },
            data : {
                status : "COMPLETED",
                completedAt : new Date(),
                updatedAt : new Date()
            },
            include:{
                user:true
            }


        })

        console.log("Order completed :", completedOrder.id);
        return {
            success: true,
            data: completedOrder,
            message: "Order verified and completed successfully"
        }
    
    }

    catch(err){
        console.error("Error verifying UTR and completing order:", err);
        return {
            success: false,
            error: err.message
        }
    }
 }

export { createOrderWithUser, getUserOrders, updateOrderUTR, verifyUTRAndCompleteOrder };