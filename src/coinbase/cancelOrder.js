const axios = require('axios');

async function cancelOrder(apiKey, orderId) {
    const url = `https://api.cdp.coinbase.com/v3/orders/${orderId}`;
    try {
        const response = await axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error cancelling order:', error.message);
        throw new Error('Failed to cancel order');
    }
}

module.exports = cancelOrder;
