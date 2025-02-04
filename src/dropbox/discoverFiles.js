const fetch = require('node-fetch');

async function listFiles(accessToken, folderPath) {
    const url = 'https://api.dropboxapi.com/2/files/list_folder';
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
        path: folderPath
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        });

        if (!response.ok) {
            throw new Error(`Error listing files: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Files listed successfully:', data.entries);
    } catch (error) {
        console.error('Error in listFiles:', error);
    }
}

module.exports = { listFiles };
