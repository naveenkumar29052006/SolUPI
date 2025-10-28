import { calculateUSDCAmount, transferUSDCToUser, initializePlatformWallet } from '../../lib/solanaService';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { orderId, inrAmount, userSolAddrs } = req.body;

    if (!userSolAddrs || !inrAmount) {
      return res.status(400).json({ success: false, error: 'userSolAddrs and inrAmount required' });
    }

    await initializePlatformWallet();

    const calc = await calculateUSDCAmount(Number(inrAmount));
    const usdcAmount = calc?.usdc ?? calc?.usdcAmount ?? null;
    if (usdcAmount === null || usdcAmount === undefined) {
      return res.status(500).json({ success: false, error: 'failed to calculate USDC amount' });
    }

    const transferResult = await transferUSDCToUser(userSolAddrs, usdcAmount);
    if (!transferResult || transferResult.success === false) {
      return res.status(500).json({ success: false, error: transferResult?.error || 'transfer failed' });
    }

    return res.status(200).json({
      success: true,
      orderId: orderId ?? null,
      usdcSent: usdcAmount,
      signature: transferResult.signature ?? null,
      explorer: transferResult.explorer ?? null
    });

  } catch (err) {
    return res.status(500).json({ success: false, error: err?.message ?? String(err) });
  }
}