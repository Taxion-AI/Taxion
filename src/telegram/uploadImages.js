const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const uploadImage = async (botToken, chatId, imagePath) => {
    const url = `https://api.telegram.org/bot${botToken}/sendPhoto`;
    const form = new FormData();
    form.append('chat_id', chatId);
    form.append('photo', fs.createReadStream(imagePath));

    try {
        const response = await axios.post(url, form, {
            headers: form.getHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

module.exports = uploadImage;
