
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

export { createOrderWithUser, getUserOrders };