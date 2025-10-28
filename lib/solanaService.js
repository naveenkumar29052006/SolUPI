import {
    Connection,
    PublicKey,
    Keypair,
    Transction,
    SystemProgram,
    LAMPORTS_PER_SOL,
    sendAndConfirmTransaction
} from '@solana/web3.js';

import{
   getOrCreateAssociatedTokenAccount,
    transfer,
    getMint,
    TOKEN_PROGRAM_ID

} from '@solana/spl-token';


import bs58 from 'bs58';

const RPC_URL=process.env.RPC_URL || 'https://api.devnet.solana.com';

const SOLANA_NETWORK= process.env.SOLANA_NETWORK || 'devnet';

const connection = new Connection(RPC_URL,'confirmed');

const USDC_MINT_ADDRESS = process.env.USDC_MINT_ADDRESS || 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr';

let platformWallet = null;

let platformTokenAccount = null;

async function initializePlatformWallet(){
    try{

        const privateKey= process.env.PRIVATE_KEY

        if(!privateKey){
            throw new Error(" private key not found");
           

        }
        const privateKeyBytes = bs58.decode(privateKey)
        platformWallet = Keypair.fromSecretKey(privateKeyBytes);
        console.log('✅ Platform wallet loaded:', platformWallet.publicKey.toString());

        await initializePlatformTokenAccount();

        return platformWallet;

    }
    catch(err){
        console.log(err)
        throw err
    }
}

async function initializePlatformTokenAccount() {
    try {
        
        const usdcMint = new PublicKey(USDC_MINT_ADDRESS);
        
      
        platformTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,           
            platformWallet,      
            usdcMint,           
            platformWallet.publicKey  
        );
        
        console.log('✅ Platform USDC account:', platformTokenAccount.address.toString());
        
        return platformTokenAccount;
        
    } catch (error) {
        console.error('❌ Error initializing token account:', error);
        throw error;
    }
}


function getPlatformWalletAddress() {
   
    if (!platformWallet) {
        initializePlatformWallet();
    }
    
    return platformWallet.publicKey.toString();
}

function isValidSolanaAddress(address) {
    try {
       
        new PublicKey(address);
        return true; 
    } catch (error) {
        return false;  
    }
}
async function getUSDCBalance(walletAddress) {
    try {
        
        const walletPublicKey = new PublicKey(walletAddress);
        
        
        const usdcMint = new PublicKey(USDC_MINT_ADDRESS);
        
        
      
        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            platformWallet,     
            usdcMint,
            walletPublicKey      
        );
        
      
        const accountInfo = await connection.getTokenAccountBalance(tokenAccount.address);
        
       
        return {
            success: true,
            balance: parseFloat(accountInfo.value.uiAmount), 
            rawBalance: accountInfo.value.amount,             
            decimals: accountInfo.value.decimals              
        };
        
    } catch (error) {
        console.error('❌ Error getting USDC balance:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

async function transferUSDCToUser(recipientAddress, amountInUSDC) {
    try {
       
        if (!platformWallet) {
            await initializePlatformWallet();
        }
        
        
        if (!isValidSolanaAddress(recipientAddress)) {
            return {
                success: false,
                error: 'Invalid recipient wallet address'
            };
        }

        const recipientPublicKey = new PublicKey(recipientAddress);

        const usdcMint = new PublicKey(USDC_MINT_ADDRESS);

        console.log('📝 Getting or creating recipient token account...');
        const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            platformWallet,        
            usdcMint,
            recipientPublicKey    
        );

        const amountInSmallestUnits = Math.floor(amountInUSDC * 1000000);
        console.log('💰 Checking platform balance...');
        const platformBalance = await connection.getTokenAccountBalance(platformTokenAccount.address);
        const platformBalanceAmount = parseInt(platformBalance.value.amount);

         if (platformBalanceAmount < amountInSmallestUnits) {
            return {
                success: false,
                error: `Insufficient USDC balance. Have ${platformBalance.value.uiAmount} USDC, need ${amountInUSDC} USDC`
            };
        }

        console.log('🚀 Sending USDC transfer...');
        const signature = await transfer(
            connection,                         
            platformWallet,                     
            platformTokenAccount.address,       
            recipientTokenAccount.address,      
            platformWallet.publicKey,           
            amountInSmallestUnits,             
            []                                 


        );

        console.log('✅ USDC transfer successful!');
        console.log('📜 Transaction signature:', signature);
        
          return {
            success: true,
            signature: signature,                    
            amount: amountInUSDC,                   
            recipient: recipientAddress,          
            recipientTokenAccount: recipientTokenAccount.address.toString(),  
            explorerUrl: `https://explorer.solana.com/tx/${signature}?cluster=${SOLANA_NETWORK}`  
        };

        } catch (error) {
        console.error('❌ Error transferring USDC:', error);
        return {
            success: false,
            error: error.message
        };
    }

}

async function verifyTransaction(signature) {
    try {
        
        const transaction = await connection.getTransaction(signature, {
            commitment: 'confirmed'  
        });
        
       
        if (!transaction) {
            return {
                success: false,
                error: 'Transaction not found on blockchain'
            };
        }
        
      
        return {
            success: true,
            transaction: transaction,
            confirmed: transaction.slot > 0,  
            blockTime: transaction.blockTime  
        };
        
    } catch (error) {
        console.error('❌ Error verifying transaction:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function calculateUSDCAmount(inrAmount) {
    try {
       
        const USD_TO_INR_RATE = parseFloat(process.env.USD_TO_INR_RATE || '83');
        
        
        const usdcAmount = inrAmount / USD_TO_INR_RATE;
       
        const roundedUSDC = Math.round(usdcAmount * 100) / 100;
        
        return {
            success: true,
            usdcAmount: roundedUSDC,      
            inrAmount: inrAmount,         
            rate: USD_TO_INR_RATE,       
            rateLastUpdated: new Date()
        };
        
    } catch (error) {
        console.error('❌ Error calculating USDC amount:', error);
        return {
            success: false,
            error: error.message
        };
    }
}


async function getPlatformSOLBalance() {
    try {
        if (!platformWallet) {
            await initializePlatformWallet();
        }
        
       
        const balance = await connection.getBalance(platformWallet.publicKey);
        
       
        const solBalance = balance / LAMPORTS_PER_SOL;
        
        return {
            success: true,
            balance: solBalance,        
            lamports: balance,          
            sufficientForFees: solBalance > 0.01  
        };
        
    } catch (error) {
        console.error('❌ Error getting SOL balance:', error);
        return {
            success: false,
            error: error.message
        };
    }
}


async function getNetworkInfo() {
    try {
     
        const version = await connection.getVersion();
        
        
        const slot = await connection.getSlot();
        
       
        const blockHeight = await connection.getBlockHeight();
        
        return {
            success: true,
            network: SOLANA_NETWORK,           
            rpcUrl: SOLANA_RPC_URL,            
            version: version,                  
            currentSlot: slot,                 
            blockHeight: blockHeight,           
            connected: true
        };
        
    } catch (error) {
        console.error('❌ Error getting network info:', error);
        return {
            success: false,
            error: error.message,
            connected: false
        };
    }
}


export {
   
    initializePlatformWallet,
    getPlatformWalletAddress,
    
    
    isValidSolanaAddress,
    
   
    getUSDCBalance,
    getPlatformSOLBalance,
    
   
    transferUSDCToUser,
    
   
    verifyTransaction,
    
   
    calculateUSDCAmount,
    getNetworkInfo
};