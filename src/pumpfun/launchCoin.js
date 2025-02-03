import axios from 'axios';

class Pumpfun {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.pumpfun.com/v1';
    }

    async authenticate() {
        try {
            const response = await axios.post(`${this.baseUrl}/auth`, {
                apiKey: this.apiKey
            });
            return response.data;
        } catch (error) {
            console.error("Error authenticating with Pumpfun:", error);
            throw error;
        }
    }

    async launchCoin(coinDetails) {
        try {
            const authData = await this.authenticate();
            const response = await axios.post(`${this.baseUrl}/coins`, coinDetails, {
                headers: {
                    Authorization: `Bearer ${authData.token}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error launching coin with Pumpfun:", error);
            throw error;
        }
    }
}

module.exports = Pumpfun;
