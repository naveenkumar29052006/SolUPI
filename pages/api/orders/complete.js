import { verifyUTRAndCompleteOrder } from '../../../lib/orderService';


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { utrNumber } = req.body;
    if (!utrNumber || typeof utrNumber !== 'string') {
      return res.status(400).json({ success: false, error: 'utrNumber required' });
    }

    const result = await verifyUTRAndCompleteOrder(utrNumber);

    if (!result || result.success === false) {
     
      const status = result && result.error && result.error.includes('not found') ? 404 : 400;
      return res.status(status).json(result);
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error('Error /api/orders/complete:', err);
    return res.status(500).json({ success: false, error: err?.message ?? String(err) });
  }
}