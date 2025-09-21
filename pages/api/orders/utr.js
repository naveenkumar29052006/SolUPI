import { updateOrderUTR } from  "../../../lib/orderService";

async function handler (req,res){
    if (req.method =="PATCH"){
        try{
            const { orderId, utrNumber, userId } = req.body;

            if(!orderId || !utrNumber || !userId){
                return res.status(400).json({
                    success:false,
                    error: "Missing required fields"
                })
            }

            if (typeof(utrNumber) !== "string" || utrNumber.trim().length !==12){
                return res.status(400).json({
                    success: false,
                    error : "Invalid UTR number format"


                })
            }

            const result = await updateOrderUTR(orderId,utrNumber,userId);

            if (result.success){
                return res.status(200).json({
                    success:true,
                    data: result.data,
                    message: "UTR updated successfully"
                })
            }

            else{
                return res.status(400).json({
                    success: false,
                    error: result.error,
                    message: "Failed to update UTR"
                })
            }


        
    }

        catch(err){
            console.error("Error updating UTR:", err);
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }
    }


    else{
        res.setHeader("Allow",["PATCH"]);
        return res.status(405).json({
            success:false,
            error: "Method Not Allowed use PATCH"
        })
    }
}

export default handler;