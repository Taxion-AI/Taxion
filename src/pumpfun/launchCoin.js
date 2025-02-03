import axios from 'axios';

class Pumpfun {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.pumpfun.com/v1';
    }

    async authenticate() {
        try {
            // Fixed the authentication endpoint
            const response = await axios.post(`${this.baseUrl}/oauth/token`, {
                apiKey: this.apiKey
            });
            return response.data;
        } catch (error) {
            console.error("Error authenticating with Pumpfun:", error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async launchCoin(coinDetails) {
        try {
            const authData = await this.authenticate();
            const response = await axios.post(`${this.baseUrl}/coins`, coinDetails, {
                headers: {
                    Authorization: `Bearer ${authData.access_token}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error launching coin with Pumpfun:", error.response ? error.response.data : error.message);
            throw error;
        }
    }
}

module.exports = Pumpfun;
