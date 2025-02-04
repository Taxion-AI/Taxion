const fetch = require('node-fetch');

async function createSharedLink(accessToken, dropboxPath) {
    const url = 'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings';
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
        path: dropboxPath,
        settings: {
            requested_visibility: 'public'
        }
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        });

        if (!response.ok) {
            throw new Error(`Error creating shared link: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Shared link created successfully:', data);
    } catch (error) {
        console.error('Error in createSharedLink:', error);
    }
}

module.exports = { createSharedLink };
