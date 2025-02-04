const fetch = require('node-fetch');

async function uploadFile(accessToken, filePath, dropboxPath) {
    const url = 'https://content.dropboxapi.com/2/files/upload';
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Dropbox-API-Arg': JSON.stringify({
            path: dropboxPath,
            mode: 'add',
            autorename: true,
            mute: false
        }),
        'Content-Type': 'application/octet-stream'
    };

    try {
        const fileContent = require('fs').readFileSync(filePath);
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: fileContent
        });

        if (!response.ok) {
            throw new Error(`Error uploading file: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('File uploaded successfully:', data);
    } catch (error) {
        console.error('Error in uploadFile:', error);
    }
}

module.exports = { uploadFile };
