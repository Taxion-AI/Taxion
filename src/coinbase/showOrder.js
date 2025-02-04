const axios = require('axios');

async function showOrder(apiKey, orderId) {
    const url = `https://api.cdp.coinbase.com/v3/orders/${orderId}`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error showing order:', error.message);
        throw new Error('Failed to show order');
    }
}

module.exports = showOrder;
