import axios from 'axios';
import OpenAI from 'openai';

class PumpfunAI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.openai = new OpenAI({ apiKey: this.apiKey });
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

    async refinePrompt(prompt) {
        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-4-turbo-preview",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert at crafting high-quality prompts for AI integration. Transform the given prompt into a more detailed and effective version that will produce better results."
                    },
                    {
                        role: "user",
                        content: `Please enhance this AI integration prompt: "${prompt}"`
                    }
                ],
                max_tokens: 200
            });
            return response.choices[0].message.content || prompt;
        } catch (error) {
            console.error("Error refining prompt:", error);
            throw error;
        }
    }

    async integrateAI(prompt) {
        try {
            const refinedPrompt = await this.refinePrompt(prompt);
            const authData = await this.authenticate();
            const response = await axios.post(`${this.baseUrl}/ai/integrate`, {
                prompt: refinedPrompt
            }, {
                headers: {
                    Authorization: `Bearer ${authData.token}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error integrating AI with Pumpfun:", error);
            throw error;
        }
    }
}

module.exports = PumpfunAI;
