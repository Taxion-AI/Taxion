const axios = require('axios');
require('dotenv').config();

const actions = {
    "google drive": ["authenticate", "make folder", "upload files", "share files"],
    "dropbox": ["authenticate", "upload files", "share files", "discover files"],
    "telegram": ["send message", "upload images"],
    "metamask": ["authenticate to metamask", "buy coins", "sell coins"],
    "coinbase": ["authenticate to coinbase", "list wallets", "create orders", "cancel order"],
    "redis": ["store activity log", "store account keys", "view connected accounts"],
    "stripe": ["authenticate to stripe", "retrieve account balance", "accept payment"],
    "pumpfun": ["launch a coin", "buy coins", "sell coins"],
    "ai integration": ["create images", "hottest topic search", "searchai", "chatbot", "analyze intent"]
};

async function queryAI(prompt) {
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
        throw new Error('OpenAI API key is not set in the environment variables');
    }

    const response = await axios.post('https://api.openai.com/v1/completions', {
        model: "gpt-4-turbo-preview",
        prompt: `Analyze the following intent: "${prompt}"`,
        max_tokens: 100
    }, {
        headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json'
        }
    });

    return response.data.choices[0].text.trim();
}

async function analyzeIntent(input) {
    try {
        console.log('Analyzing input:', input);
        const intents = input.split(' and ').map(intent => intent.trim().toLowerCase());
        console.log('Intents identified:', intents);
        const categorizedIntents = [];

        for (const intent of intents) {
            const aiResult = await queryAI(intent);
            let categorized = false;

            for (const [category, actionsList] of Object.entries(actions)) {
                if (actionsList.some(action => aiResult.includes(action))) {
                    categorizedIntents.push({ category, action: aiResult });
                    categorized = true;
                    break;
                }
            }

            if (!categorized) {
                categorizedIntents.push({ category: "unknown", action: aiResult });
            }
        }

        console.log('Categorized intents:', categorizedIntents);
        return categorizedIntents;
    } catch (error) {
        console.error('Error analyzing input:', error.response ? error.response.data : error.message);
        console.error('Stack trace:', error.stack);
        throw error;
    }
}

function validateInput(input) {
    if (typeof input !== 'string' || input.trim() === '') {
        throw new Error('Invalid input: Input must be a non-empty string');
    }
}

function logAnalysisDetails(input, categorizedIntents) {
    console.log('Analysis details:');
    console.log('Input:', input);
    console.log('Categorized Intents:', categorizedIntents);
}

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error.message);
    console.error('Stack trace:', error.stack);
});

module.exports = {
    analyzeIntent,
    validateInput,
    logAnalysisDetails
};
