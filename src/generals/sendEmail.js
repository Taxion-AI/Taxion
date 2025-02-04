const axios = require('axios');
require('dotenv').config();

async function sendEmail(senderName, senderEmail, recipientName, recipientEmail, subject, htmlContent) {
    const brevoApiKey = process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
        throw new Error('Brevo API key is not set in the environment variables');
    }

    const emailData = {
        sender: {
            name: senderName,
            email: senderEmail
        },
        to: [
            {
                email: recipientEmail,
                name: recipientName
            }
        ],
        subject: subject,
        htmlContent: htmlContent
    };

    try {
        const response = await axios.post('https://api.brevo.com/v3/smtp/email', emailData, {
            headers: {
                'accept': 'application/json',
                'api-key': brevoApiKey,
                'content-type': 'application/json'
            }
        });
        console.log('Email sent successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending email:', error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports = {
    sendEmail
};
