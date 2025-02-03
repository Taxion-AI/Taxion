const { MetaMaskSDK } = require('@metamask/sdk');
const redis = require('redis');
const client = redis.createClient();

async function storeActivityLog() {
    const sdk = new MetaMaskSDK();
    try {
        const accounts = await sdk.wallet.getAccounts();
        const activityLog = {
            timestamp: new Date(),
            accounts: accounts,
            activity: 'User logged in'
        };

        client.set('activityLog', JSON.stringify(activityLog), redis.print);
        console.log('Activity log stored:', activityLog);

        client.get('activityLog', (err, log) => {
            if (err) throw err;
            console.log('Stored activity log in Redis:', JSON.parse(log));
        });

        if (accounts.length > 0) {
            console.log('User has active accounts.');
        } else {
            console.log('No active accounts found.');
        }

    } catch (error) {
        console.error('Error storing activity log:', error);
    }
}

storeActivityLog();
