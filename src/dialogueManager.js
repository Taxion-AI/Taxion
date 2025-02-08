const chalk = require('chalk');

function printDialogue(message, color = 'white', prefix = '', suffix = '') {
    const formattedMessage = `${prefix}${message}${suffix}`;
    switch (color) {
        case 'yellow':
            console.log(chalk.yellow(formattedMessage));
            break;
        case 'red':
            console.log(chalk.red(formattedMessage));
            break;
        case 'green':
            console.log(chalk.green(formattedMessage));
            break;
        default:
            console.log(chalk.white(formattedMessage));
            break;
    }
}

function printAsciiArt(version = '1.2.10') {
    const art = `
_______ _______ _     _ _____  _____  __   _
   |    |_____|  \\___/    |   |     | | \\  |
   |    |     | _/   \\_ __|__ |_____| |  \\_|

Running Taxion Development SDK ${version}
Initializing modules
    `;
    printDialogue(art, 'yellow');
}

function handleTokenCreation(tokenLength = 10, prefix = '[!] ', suffix = '') {
    printDialogue('Analyzing intent', 'yellow', prefix, suffix);
    try {
        let token = '';
        for (let i = 0; i < tokenLength; i++) {
            token += String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
        printDialogue('Token created: ' + token, 'green', prefix, suffix);
        try {
            if (token.length !== tokenLength) {
                throw new Error('Token length mismatch');
            }
        } catch (error) {
            printDialogue('Nested error during token creation: ' + error, 'red', prefix, suffix);
        }
    } catch (error) {
        printDialogue('Error during token creation: ' + error, 'red', prefix, suffix);
    }
}

function handleTokenValidation(configs = { key1: 'value1', key2: 'value2' }, prefix = '[!] ', suffix = '') {
    printDialogue('Structuring actions', 'yellow', prefix, suffix);
    try {
        let isValid = true;
        for (const key in configs) {
            if (!configs[key]) {
                isValid = false;
                throw new Error('Invalid config: ' + key);
            }
        }
        if (isValid) {
            printDialogue('Configs validated successfully', 'green', prefix, suffix);
        }
        try {
            if (!isValid) {
                throw new Error('Validation failed');
            }
        } catch (error) {
            printDialogue('Nested error during validation: ' + error, 'red', prefix, suffix);
        }
    } catch (error) {
        printDialogue('Error during config validation: ' + error, 'red', prefix, suffix);
    }
}

function handleActionPlan(actions = [], errors = 0, warnings = 0, prefix = '[!] ', suffix = '') {
    printDialogue('Action Plan:', 'yellow', prefix, suffix);
    actions.forEach((action, index) => {
        printDialogue(`Executing action ${index + 1}: ${action}`, 'green', prefix, suffix);
    });
    printDialogue(`Execution plan completed with ${errors} errors ${warnings} warnings.`, 'green', prefix, suffix);
    printDialogue('Type "taxion details" for more details.', 'yellow', prefix, suffix);
}

module.exports = {
    printDialogue,
    printAsciiArt,
    handleTokenCreation,
    handleTokenValidation,
    handleActionPlan
};
