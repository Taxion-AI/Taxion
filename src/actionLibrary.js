const googleDrive = {
    authenticate: require('./googleDrive/authenticate'),
    makeFolder: require('./googleDrive/makeFolder'),
    uploadFiles: require('./googleDrive/uploadFiles'),
    shareFiles: require('./googleDrive/shareFiles')
};

const dropbox = {
    authenticate: require('./dropbox/authenticate'),
    uploadFiles: require('./dropbox/uploadFiles'),
    shareFiles: require('./dropbox/shareFiles'),
    discoverFiles: require('./dropbox/discoverFiles')
};

const telegram = {
    sendMessage: require('./telegram/sendMessage'),
    uploadImages: require('./telegram/uploadImages')
};

const metamask = {
    authenticate: require('./metamask/authenticate'),
    buyCoins: require('./metamask/buyCoins'),
    sellCoins: require('./metamask/sellCoins')
};

const coinbase = {
    authenticate: require('./coinbase/authenticate'),
    listWallets: require('./coinbase/listWallets'),
    createOrders: require('./coinbase/createOrders'),
    cancelOrder: require('./coinbase/cancelOrder')
};

const redis = {
    storeActivityLog: require('./redis/storeActivityLog'),
    storeAccountKeys: require('./redis/storeAccountKeys'),
    viewConnectedAccounts: require('./redis/viewConnectedAccounts')
};

const stripe = {
    authenticate: require('./stripe/authenticate'),
    retrieveAccountBalance: require('./stripe/retrieveAccountBalance'),
    acceptPayment: require('./stripe/acceptPayment')
};

const pumpfun = {
    launchCoin: require('./pumpfun/launchCoin'),
    buyCoins: require('./pumpfun/buyCoins'),
    sellCoins: require('./pumpfun/sellCoins'),
    aiIntegration: require('./pumpfun/aiIntegration'),
    createImages: require('./generals/createImages')
};

const general_func = {
    hottestTopicSearch: require('./generals/hottestTopicSearch'),
    searchAI: require('./generals/searchAI'),
    chatbot: require('./generals/chatbot'),
    analyzeIntent: require('./generals/analyzeIntent')
};

const sendEmail = require('./generals/sendEmail');

module.exports = {
    googleDrive,
    dropbox,
    telegram,
    metamask,
    coinbase,
    redis,
    stripe,
    pumpfun,
    general_func,
    sendEmail
};
