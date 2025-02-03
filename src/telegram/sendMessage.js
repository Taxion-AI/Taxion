const axios = require('axios');

const sendMessage = async (botToken, chatId, text) => {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const params = {
        chat_id: chatId,
        text: text
    };

    try {
        const response = await axios.post(url, params);
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

module.exports = sendMessage;
