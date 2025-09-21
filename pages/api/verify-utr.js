import { verifyUTRAndCompleteOrder } from "../../lib/orderService";

async function handler (req,res){

    if (req.method =="POST"){

        try{

            const {utrNumber} = req.body;

            if (!utrNumber){
                return res.status(400).json({
                    success:false,
                    error: "Missing required field: utrNumber"
                })
            }

            if (typeof(utrNumber) !== "string" || utrNumber.trim().length !==12){
                return res.status(400).json({
                    success: false,
                    error : "Invalid UTR number format"
                })  
            }

            const result = await verifyUTRAndCompleteOrder(utrNumber);
            

            if (result.success){
                return res.status(200).json({
                    success:true,
                    data: result.data,
                    message: "UTR verified and order completed successfully"
                })
            }
            
            else{
                return res.status(400).json({
                    success: false,
                    error: result.error,
                    message: "Failed to verify UTR and complete order"
                })  }


        }

        catch(err){
            console.error("Error verifying UTR:", err);
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }

}
else{
    res.setHeader("Allow",["POST"]);
    return res.status(405).json({
        success:false,
        error: "Method Not Allowed use POST"    
    })
}

}

export default handler;