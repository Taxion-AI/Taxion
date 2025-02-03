import axios from 'axios';
import OpenAI from 'openai';

class Chatbot {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.openai = new OpenAI({ apiKey: this.apiKey });
    }

    async refinePrompt(prompt) {
        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-4-turbo-preview",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert at crafting high-quality prompts for AI chatbots. Transform the given prompt into a more detailed and effective version that will produce better results."
                    },
                    {
                        role: "user",
                        content: `Please enhance this chatbot prompt: "${prompt}"`
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

    async chat(prompt) {
        try {
            const refinedPrompt = await this.refinePrompt(prompt);
            const chatUrl = "https://await.chat.openai.com/api";
            const response = await axios.post(chatUrl, { query: refinedPrompt }, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error performing chat:", error);
            throw error;
        }
    }

    async getChatResponse(prompt) {
        try {
            const results = await this.chat(prompt);
            return results;
        } catch (error) {
            console.error("Error getting chat response:", error);
            throw error;
        }
    }
}

module.exports = Chatbot;
