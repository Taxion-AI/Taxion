const axios = require('axios');

async function listOrders(apiKey, options = {}) {
    const url = 'https://api.cdp.coinbase.com/v3/orders';
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            },
            params: options
        });
        console.log('Orders listed successfully:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error listing orders:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw new Error('Failed to list orders');
    }
}

module.exports = listOrders;
