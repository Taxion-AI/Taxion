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
        return response.data;
    } catch (error) {
        console.error('Error listing orders:', error.message);
        throw new Error('Failed to list orders');
    }
}

module.exports = listOrders;
