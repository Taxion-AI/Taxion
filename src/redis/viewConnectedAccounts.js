const { MetaMaskSDK } = require('@metamask/sdk');
const redis = require('redis');
const client = redis.createClient();

async function viewConnectedAccounts() {
    const sdk = new MetaMaskSDK();
    try {
        const accounts = await sdk.wallet.getAccounts();
        console.log('Connected accounts:', accounts);

        if (accounts.length === 0) {
            console.log('No accounts connected.');
            return;
        }

        accounts.forEach(account => {
            console.log(`Account: ${account}`);
            client.set(`connectedAccount:${account}`, account, redis.print);
        });

        client.keys('connectedAccount:*', (err, keys) => {
            if (err) throw err;
            keys.forEach(key => {
                client.get(key, (err, value) => {
                    if (err) throw err;
                    console.log(`Stored account in Redis: ${value}`);
                });
            });
        });

    } catch (error) {
        console.error('Error viewing connected accounts:', error);
    }
}

viewConnectedAccounts();
