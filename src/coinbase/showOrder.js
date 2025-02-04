const axios = require('axios');

async function showOrder(apiKey, orderId) {
    const url = `https://api.cdp.coinbase.com/v3/orders/${orderId}`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        console.log('Order details retrieved successfully:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error showing order:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw new Error('Failed to show order');
    }
}

module.exports = showOrder;
