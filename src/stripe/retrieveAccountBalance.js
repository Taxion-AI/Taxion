import axios from 'axios';

class Stripe {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.stripe.com/v1';
    }

    async authenticate() {
        try {
            // Fixed the authentication endpoint
            const response = await axios.post(`${this.baseUrl}/oauth/token`, {
                apiKey: this.apiKey
            });
            return response.data;
        } catch (error) {
            console.error("Error authenticating with Stripe:", error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async retrieveAccountBalance() {
        try {
            const authData = await this.authenticate();
            const response = await axios.get(`${this.baseUrl}/balance`, {
                headers: {
                    Authorization: `Bearer ${authData.access_token}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error retrieving account balance from Stripe:", error.response ? error.response.data : error.message);
            throw error;
        }
    }
}

module.exports = Stripe;
