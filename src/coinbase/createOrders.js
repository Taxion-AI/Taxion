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
        console.log('Order created successfully:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error creating order:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw new Error('Failed to create order');
    }
}

module.exports = createOrder;
