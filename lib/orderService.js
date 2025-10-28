
import prisma from "./prisma";
import { calculateUSDCAmount, transferUSDCToUser, initializePlatformWallet,isValidSolanaAddress } from './solanaService';


async function createOrderWithUser(userId,amount,walletAddress){
    try{
        const parsedAmount = parseFloat(amount);
        if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
            return { success: false, error: 'Invalid amount' };
        }
        if (!walletAddress || !isValidSolanaAddress(walletAddress)) {
            return { success: false, error: 'Invalid Solana wallet address' };
        }
        const user = await prisma.user.upsert({
            where :{
                id : userId
            },

            update: {
                walletAddr: walletAddress

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
        verifyUTRAndCompleteOrder(utrNumber).catch(err => {
            console.error('Auto-payout failed for UTR', utrNumber, err);
        });
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
    try {
       
        const order = await prisma.order.findFirst({
            where: { utrNumber: utrNumber }
        });
        if (!order) {
            return { success: false, error: 'Order with given UTR not found' };
        }
        if (order.status !== 'PENDING' && order.status !== 'AWAITING_PAYMENT') {
            return { success: false, error: `Order not in payable state (${order.status})` };
        }
        if (!order.walletAddr || !isValidSolanaAddress(order.walletAddr)) {
            return { success: false, error: 'Order missing or invalid wallet address' };
        }

        if (order.txSignature) {
            return { success: false, error: 'Order already processed' };
        }

        const claim = await prisma.order.updateMany({
            where: {
                id: order.id,
                status: { in: ['PENDING', 'AWAITING_PAYMENT'] }
            },
            data: { status: 'PROCESSING' }
        });

        if (claim.count === 0) {
            return { success: false, error: 'Order already processing or completed' };
        }

       
        await initializePlatformWallet();

       
        const calc = await calculateUSDCAmount(Number(order.amount));
        const usdcAmount = calc?.usdc ?? calc?.usdcAmount ?? null;
        if (usdcAmount === null || usdcAmount === undefined) {
            await prisma.order.update({ where: { id: order.id }, data: { status: 'PENDING' } });
            return { success: false, error: 'Failed to calculate USDC amount' };
        }

       
        const transferResult = await transferUSDCToUser(order.walletAddr, usdcAmount);
        if (!transferResult || transferResult.success === false) {
            await prisma.order.update({ where: { id: order.id }, data: { status: 'PENDING' } });
            return { success: false, error: transferResult?.error || 'Transfer failed' };
        }

       
        const updated = await prisma.order.update({
            where: { id: order.id },
            data: {
                status: 'COMPLETED',
                txSignature: transferResult.signature,            
                recipientTokenAccount: transferResult.recipientTokenAccount ?? null,
                completedAt: new Date()
            }
        });

        return { success: true, data: updated };

    } catch (err) {
         try {
            await prisma.order.updateMany({
                where: { utrNumber: utrNumber, status: 'PROCESSING' },
                data: { status: 'PENDING' }
            });
        }catch(e){

        
        console.error('Error in verifyUTRAndCompleteOrder:', err);
        return { success: false, error: err.message || String(err) };
        }
    }
}


export { createOrderWithUser, getUserOrders, updateOrderUTR, verifyUTRAndCompleteOrder };