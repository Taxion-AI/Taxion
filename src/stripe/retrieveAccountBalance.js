import axios from 'axios';

class Stripe {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.stripe.com/v1';
    }

    async authenticate() {
        try {
            const response = await axios.post(`${this.baseUrl}/auth`, {
                apiKey: this.apiKey
            });
            return response.data;
        } catch (error) {
            console.error("Error authenticating with Stripe:", error);
            throw error;
        }
    }

    async retrieveAccountBalance() {
        try {
            const authData = await this.authenticate();
            const response = await axios.get(`${this.baseUrl}/balance`, {
                headers: {
                    Authorization: `Bearer ${authData.token}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error retrieving account balance from Stripe:", error);
            throw error;
        }
    }
}

module.exports = Stripe;
