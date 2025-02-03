import axios from 'axios';

class Metamask {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://fake-metamask-api.com/v1';
    }

    async authenticate() {
        try {
            const response = await axios.post(`${this.baseUrl}/auth`, {
                apiKey: this.apiKey
            });
            return response.data;
        } catch (error) {
            console.error("Error authenticating with Metamask:", error);
            throw error;
        }
    }

    async sellCoins(coinDetails) {
        try {
            const authData = await this.authenticate();
            const response = await axios.post(`${this.baseUrl}/sell`, coinDetails, {
                headers: {
                    Authorization: `Bearer ${authData.token}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error selling coins with Metamask:", error);
            throw error;
        }
    }
}

module.exports = Metamask;
