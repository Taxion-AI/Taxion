import axios from 'axios';
import OpenAI from 'openai';

class HottestTopicSearch {
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
                        content: "You are an expert at crafting high-quality prompts for AI searches. Transform the given prompt into a more detailed and effective version that will produce better results."
                    },
                    {
                        role: "user",
                        content: `Please enhance this search prompt: "${prompt}"`
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

    async searchHottestTopic(prompt) {
        try {
            const refinedPrompt = await this.refinePrompt(prompt);
            const searchUrl = "https://api.hottesttopics.com/v1/search";
            const response = await axios.post(searchUrl, { query: refinedPrompt }, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error performing hottest topic search:", error);
            throw error;
        }
    }

    async getHottestTopic(prompt) {
        try {
            const results = await this.searchHottestTopic(prompt);
            return results;
        } catch (error) {
            console.error("Error getting hottest topic:", error);
            throw error;
        }
    }
}

module.exports = HottestTopicSearch;
