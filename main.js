const { analyzeIntent } = require('./src/analyzeIntent');
const { processSingleIntent, processMultipleIntents } = require('./src/actionManager');

async function execute(input) {
    try {
        console.log('Starting execution with input:', input);
        const intents = analyzeIntent(input);
        let result;

        if (intents.length === 1) {
            result = await processSingleIntent(intents[0]);
        } else {
            result = await processMultipleIntents(intents);
        }

        console.log('Execution result:', result);
        return result;
    } catch (error) {
        console.error('Error executing input:', error.message);
        console.error('Stack trace:', error.stack);
        throw error;
    } finally {
        console.log('Execution completed.');
    }
}

module.exports = {
    execute
};
