import axios from 'axios';
import OpenAI from 'openai';

class CreateImages {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.openai = new OpenAI({ apiKey: this.apiKey });
        this.baseUrl = 'https://fake-image-api.com/v1';
    }

    async authenticate() {
        try {
            const response = await axios.post(`${this.baseUrl}/auth`, {
                apiKey: this.apiKey
            });
            return response.data;
        } catch (error) {
            console.error("Error authenticating with Image API:", error);
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
                        content: "You are an expert at crafting high-quality prompts for AI image generation. Transform the given prompt into a more detailed and effective version that will produce better results."
                    },
                    {
                        role: "user",
                        content: `Please enhance this image generation prompt: "${prompt}"`
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

    async createImage(prompt) {
        try {
            const refinedPrompt = await this.refinePrompt(prompt);
            const authData = await this.authenticate();
            const response = await axios.post(`${this.baseUrl}/images`, {
                prompt: refinedPrompt
            }, {
                headers: {
                    Authorization: `Bearer ${authData.token}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error creating image:", error);
            throw error;
        }
    }

    async updateImage(imageId, newPrompt) {
        try {
            const refinedPrompt = await this.refinePrompt(newPrompt);
            const authData = await this.authenticate();
            const response = await axios.put(`${this.baseUrl}/images/${imageId}`, {
                prompt: refinedPrompt
            }, {
                headers: {
                    Authorization: `Bearer ${authData.token}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error updating image:", error);
            throw error;
        }
    }

    async deleteImage(imageId) {
        try {
            const authData = await this.authenticate();
            const response = await axios.delete(`${this.baseUrl}/images/${imageId}`, {
                headers: {
                    Authorization: `Bearer ${authData.token}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error deleting image:", error);
            throw error;
        }
    }

    async getImage(imageId) {
        try {
            const authData = await this.authenticate();
            const response = await axios.get(`${this.baseUrl}/images/${imageId}`, {
                headers: {
                    Authorization: `Bearer ${authData.token}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error retrieving image:", error);
            throw error;
        }
    }
}

module.exports = CreateImages;
