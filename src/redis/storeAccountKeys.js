const { MetaMaskSDK } = require('@metamask/sdk');
const redis = require('redis');
const client = redis.createClient();

async function storeAccountKeys() {
    const sdk = new MetaMaskSDK();
    try {
        const accounts = await sdk.wallet.getAccounts();
        if (accounts.length === 0) {
            console.log('No accounts connected.');
            return;
        }

        for (const account of accounts) {
            const accountKey = await sdk.wallet.getPrivateKey(account);
            client.set(`accountKey:${account}`, accountKey, redis.print);
            console.log(`Stored key for account ${account}`);

            client.get(`accountKey:${account}`, (err, key) => {
                if (err) throw err;
                console.log(`Retrieved key for account ${account}: ${key}`);
            });
        }

        client.keys('accountKey:*', (err, keys) => {
            if (err) throw err;
            keys.forEach(key => {
                client.get(key, (err, value) => {
                    if (err) throw err;
                    console.log(`Stored account key in Redis: ${value}`);
                });
            });
        });

    } catch (error) {
        console.error('Error storing account keys:', error);
    }
}

storeAccountKeys();
