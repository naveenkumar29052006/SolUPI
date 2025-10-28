import { createOrderWithUser } from '../../../lib/orderService';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });
  try {
    const { userId, amount, walletAddress } = req.body;
    if (!userId || !amount || !walletAddress) {
      return res.status(400).json({ success: false, error: 'userId, amount, walletAddress required' });
    }
    const result = await createOrderWithUser(userId, amount, walletAddress);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || String(err) });
  }
}