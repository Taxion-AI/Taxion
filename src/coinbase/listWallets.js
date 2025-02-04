const axios = require('axios');

async function listWallets(apiKey) {
    const url = 'https://api.cdp.coinbase.com/v3/wallets';
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        console.log('Wallets listed successfully:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error listing wallets:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw new Error('Failed to list wallets');
    }
}

module.exports = listWallets;
