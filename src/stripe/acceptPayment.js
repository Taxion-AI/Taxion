import axios from 'axios';

class Stripe {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://fake-stripe-api.com/v1';
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

    async acceptPayment(paymentDetails) {
        try {
            const authData = await this.authenticate();
            const response = await axios.post(`${this.baseUrl}/payments`, paymentDetails, {
                headers: {
                    Authorization: `Bearer ${authData.token}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error accepting payment with Stripe:", error);
            throw error;
        }
    }
}

module.exports = Stripe;
