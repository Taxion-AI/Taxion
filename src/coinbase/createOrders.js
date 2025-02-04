const axios = require('axios');

async function createOrder(apiKey, orderData) {
    const url = 'https://api.cdp.coinbase.com/v3/orders';
    try {
        const response = await axios.post(url, orderData, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error.message);
        throw new Error('Failed to create order');
    }
}

module.exports = createOrder;
