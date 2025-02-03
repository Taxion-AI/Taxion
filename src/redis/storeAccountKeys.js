const { MetaMaskSDK } = require('@metamask/sdk');
const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
    console.error('Redis client error:', err);
});

async function storeAccountKeys() {
    const sdk = new MetaMaskSDK();
    try {
        const accounts = await sdk.wallet.getAccounts();
        if (accounts.length === 0) {
            console.log('No accounts connected.');
            return;
        }

        for (const account of accounts) {
            try {
                const accountKey = await sdk.wallet.getPrivateKey(account);
                client.set(`accountKey:${account}`, accountKey, redis.print);
                console.log(`Stored key for account ${account}`);

                client.get(`accountKey:${account}`, (err, key) => {
                    if (err) {
                        console.error(`Error retrieving key for account ${account}:`, err);
                        return;
                    }
                    console.log(`Retrieved key for account ${account}: ${key}`);
                });
            } catch (innerError) {
                console.error(`Error processing account ${account}:`, innerError);
            }
        }

        client.keys('accountKey:*', (err, keys) => {
            if (err) {
                console.error('Error fetching keys from Redis:', err);
                return;
            }
            keys.forEach(key => {
                client.get(key, (err, value) => {
                    if (err) {
                        console.error(`Error retrieving value for key ${key}:`, err);
                        return;
                    }
                    console.log(`Stored account key in Redis: ${value}`);
                });
            });
        });

    } catch (error) {
        console.error('Error storing account keys:', error);
    }
}

storeAccountKeys();
