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
        console.log('Order refunded successfully:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error refunding order:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw new Error('Failed to refund order');
    }
}

module.exports = refundOrder;
