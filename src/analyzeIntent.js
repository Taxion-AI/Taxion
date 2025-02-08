const axios = require('axios');
require('dotenv').config();

const actions = {
    "google-drive": ["authenticate", "make folder", "upload files", "share files"],
    "dropbox": ["authenticate", "upload files", "share files", "discover files"],
    "telegram": ["send message", "upload images"],
    "metamask": ["authenticate to metamask", "buy coins", "sell coins"],
    "coinbase": ["authenticate to coinbase", "list wallets", "create orders", "cancel order"],
    "redis": ["store activity log", "store account keys", "view connected accounts"],
    "stripe": ["authenticate to stripe", "retrieve account balance", "accept payment"],
    "pumpfun": ["launch a coin", "buy coins", "sell coins"],
    "ai-integration": ["create images", "hottest topic search", "searchai", "chatbot", "analyze intent"]
};

async function queryAI(prompt) {
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
        throw new Error('OpenAI API key is not set in the environment variables');
    }

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "gpt-4-turbo-preview",
            prompt: `Analyze the following intent and categorize it based on the available actions. Determine which service the intent corresponds to and match it with the most relevant action from the predefined list. The available services and their respective actions are as follows: Google Drive supports authentication, making folders, uploading files, and sharing files. Dropbox allows authentication, uploading files, sharing files, and discovering files. Telegram enables sending messages and uploading images. MetaMask provides authentication, buying coins, and selling coins. Coinbase supports authentication, listing wallets, creating orders, and canceling orders. Redis allows storing activity logs, storing account keys, and viewing connected accounts. Stripe provides authentication, retrieving account balances, and accepting payments. Pump.fun enables launching a coin, buying coins, and selling coins. AI Integration supports creating images, searching for the hottest topics, using SearchAI, operating a chatbot, and analyzing intent. Based on this information, categorize the given intent accurately."${prompt}"`,
            max_tokens: 100
        }, {
            headers: {
                'Authorization': `Bearer ${openaiApiKey}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error querying AI:', error.response ? error.response.data : error.message);
        throw error;
    }
}

function categorizeIntent(aiResult) {
    for (const [category, actionsList] of Object.entries(actions)) {
        if (actionsList.some(action => aiResult.includes(action))) {
            return { category, action: aiResult };
        }
    }
    return { category: "unknown", action: aiResult };
}

async function analyzeIntent(input) {
    try {
        console.log('Analyzing input:', input);
        const intents = input.split(' and ').map(intent => intent.trim().toLowerCase());
        console.log('Intents identified:', intents);
        const categorizedIntents = [];

        for (const intent of intents) {
            const aiResult = await queryAI(intent);
            const categorizedIntent = categorizeIntent(aiResult);
            categorizedIntents.push(categorizedIntent);
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
