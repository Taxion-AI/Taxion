const axios = require('axios');

async function refundOrder(apiKey, orderId, options = {}) {
    const url = `https://api.cdp.coinbase.com/v3/orders/${orderId}/refund`;
    try {
        const response = await axios.post(url, options, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error refunding order:', error.message);
        throw new Error('Failed to refund order');
    }
}

module.exports = refundOrder;
