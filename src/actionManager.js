const actionLibrary = require('../actionLibrary');

const ACTIONS = {
    "create image": actionLibrary.pumpfun.createImages,
    "send message": actionLibrary.telegram.sendMessage,
    "upload file": actionLibrary.googleDrive.uploadFiles,
    "authenticate google drive": actionLibrary.googleDrive.authenticate,
    "make folder": actionLibrary.googleDrive.makeFolder,
    "share files": actionLibrary.googleDrive.shareFiles,
    "authenticate dropbox": actionLibrary.dropbox.authenticate,
    "upload dropbox files": actionLibrary.dropbox.uploadFiles,
    "share dropbox files": actionLibrary.dropbox.shareFiles,
    "discover dropbox files": actionLibrary.dropbox.discoverFiles,
    "upload telegram images": actionLibrary.telegram.uploadImages,
    "authenticate metamask": actionLibrary.metamask.authenticate,
    "buy coins": actionLibrary.metamask.buyCoins,
    "sell coins": actionLibrary.metamask.sellCoins,
    "authenticate coinbase": actionLibrary.coinbase.authenticate,
    "list wallets": actionLibrary.coinbase.listWallets,
    "create orders": actionLibrary.coinbase.createOrders,
    "cancel order": actionLibrary.coinbase.cancelOrder,
    "store activity log": actionLibrary.redis.storeActivityLog,
    "store account keys": actionLibrary.redis.storeAccountKeys,
    "view connected accounts": actionLibrary.redis.viewConnectedAccounts,
    "retrieve account balance": actionLibrary.stripe.retrieveAccountBalance,
    "accept payment": actionLibrary.stripe.acceptPayment,
    "launch coin": actionLibrary.pumpfun.launchCoin,
    "ai integration": actionLibrary.pumpfun.aiIntegration,
    "hottest topic search": actionLibrary.general_func.hottestTopicSearch,
    "search AI": actionLibrary.general_func.searchAI,
    "chatbot": actionLibrary.general_func.chatbot,
    "analyze intent": actionLibrary.general_func.analyzeIntent
};

const buffer = [];

const addToBuffer = (intent, result) => {
    buffer.push({ intent, result });
    if (buffer.length > 100) {
        buffer.shift(); 
    }
};

const logBuffer = () => {
    console.log('Current buffer state:', buffer);
};

const clearBuffer = () => {
    buffer.length = 0;
    console.log('Buffer cleared');
};

const processSingleIntent = async (intent) => {
    const action = ACTIONS[intent];
    if (action) {
        return await action();
    } else {
        throw new Error(`Unknown intent: ${intent}`);
    }
};

const processMultipleIntents = async (intents) => {
    const results = [];
    for (let i = 0; i < intents.length; i++) {
        try {
            const result = await processSingleIntent(intents[i]);
            results.push(result);
            addToBuffer(intents[i], result);
        } catch (error) {
            console.error(`Error processing intent ${i + 1}:`, error);
            results.push({ error: error.message });
            addToBuffer(intents[i], { error: error.message });
        }
    }
    logBuffer();
    return results;
};

const retryFailedIntents = async () => {
    const failedIntents = buffer.filter(item => item.result.error);
    const results = [];
    for (let i = 0; i < failedIntents.length; i++) {
        try {
            const result = await processSingleIntent(failedIntents[i].intent);
            results.push(result);
            buffer[buffer.indexOf(failedIntents[i])].result = result;
        } catch (error) {
            console.error(`Error retrying intent ${i + 1}:`, error);
            results.push({ error: error.message });
        }
    }
    logBuffer();
    return results;
};

const getBuffer = () => {
    return buffer;
};

const getBufferSize = () => {
    return buffer.length;
};

const getBufferItem = (index) => {
    if (index < 0 || index >= buffer.length) {
        throw new Error('Index out of bounds');
    }
    return buffer[index];
};

const removeBufferItem = (index) => {
    if (index < 0 || index >= buffer.length) {
        throw new Error('Index out of bounds');
    }
    buffer.splice(index, 1);
    console.log(`Buffer item at index ${index} removed`);
};

const updateBufferItem = (index, newResult) => {
    if (index < 0 || index >= buffer.length) {
        throw new Error('Index out of bounds');
    }
    buffer[index].result = newResult;
    console.log(`Buffer item at index ${index} updated`);
};

module.exports = {
    processSingleIntent,
    processMultipleIntents,
    buffer,
    addToBuffer,
    logBuffer,
    clearBuffer,
    retryFailedIntents,
    getBuffer,
    getBufferSize,
    getBufferItem,
    removeBufferItem,
    updateBufferItem
};
