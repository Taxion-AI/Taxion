const axios = require('axios');

async function cancelOrder(apiKey, orderId) {
    const url = `https://api.cdp.coinbase.com/v3/orders/${orderId}`;
    try {
        const response = await axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        console.log('Order cancelled successfully:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error cancelling order:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw new Error('Failed to cancel order');
    }
}

module.exports = cancelOrder;
