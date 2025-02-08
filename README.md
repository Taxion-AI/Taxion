# Taxion SDK

Taxion is an AI-driven SDK designed to automate and streamline various tasks by integrating with multiple services such as Google Drive, Dropbox, Telegram, Metamask, Coinbase, Redis, Stripe, and more. This document provides a comprehensive technical overview of the SDK, including usage instructions and available actions.

## Installation

To install the Taxion SDK, use the following command:

```bash
npm install taxion
```

## Usage

### Initialization

To initialize the SDK, import and create an instance of the `Taxion` class:

```javascript
const Taxion = require('taxion');

const config = {
    "Telegram_UID": "YOUR-TELEGRAM-UID",
    "Brevo_API-KEY": "YOUR-BREVO-APIKEY",
    "Email": "email@domain.com"
};

const prompt = new Taxion(config);
```

### Methods

#### `.execute(command)`

Executes a given command. The command can be any prompt that describes the desired automation task. This method supports method chaining.

```javascript
prompt.execute("Find the hottest in crypto right now, create a summary, and send it into my personal telegram").telegram("TELEGRAM-UID");
```

### Available Actions

#### Google Drive

- `authenticate`: Authenticates the user with Google Drive.
- `makeFolder`: Creates a new folder in Google Drive.
- `uploadFiles`: Uploads files to Google Drive.
- `shareFiles`: Shares files from Google Drive.

#### Dropbox

- `authenticate`: Authenticates the user with Dropbox.
- `uploadFiles`: Uploads files to Dropbox.
- `shareFiles`: Shares files from Dropbox.
- `discoverFiles`: Discovers files in Dropbox.

#### Telegram

- `sendMessage`: Sends a message via Telegram.
- `uploadImages`: Uploads images to Telegram.

#### Metamask

- `authenticate`: Authenticates the user with Metamask.
- `buyCoins`: Buys cryptocurrency using Metamask.
- `sellCoins`: Sells cryptocurrency using Metamask.

#### Coinbase

- `authenticate`: Authenticates the user with Coinbase.
- `listWallets`: Lists wallets in Coinbase.
- `createOrders`: Creates orders in Coinbase.
- `cancelOrder`: Cancels an order in Coinbase.

#### Redis

- `storeActivityLog`: Stores activity logs in Redis.
- `storeAccountKeys`: Stores account keys in Redis.
- `viewConnectedAccounts`: Views connected accounts in Redis.

#### Stripe

- `authenticate`: Authenticates the user with Stripe.
- `retrieveAccountBalance`: Retrieves account balance from Stripe.
- `acceptPayment`: Accepts payment via Stripe.

#### Pumpfun

- `launchCoin`: Launches a new cryptocurrency.
- `buyCoins`: Buys cryptocurrency.
- `sellCoins`: Sells cryptocurrency.
- `aiIntegration`: Integrates AI functionalities.
- `createImages`: Creates images using AI.

#### General Functions

- `hottestTopicSearch`: Searches for the hottest topic.
- `searchAI`: Searches using AI.
- `chatbot`: Interacts with the chatbot.
- `analyzeIntent`: Analyzes user intent.

## Example

Here is an example of how to use the Taxion SDK to automate tasks:

```javascript
const Taxion = require('taxion-sdk');

const config = {
    "Telegram_UID": "YOUR-TELEGRAM-UID",
    "Brevo_API-KEY": "YOUR-BREVO-APIKEY",
    "Email": "email@domain.com"
};

const prompt = new Taxion(config);

prompt.execute("Automate a daily report summarizing the latest news and stock price movements for Nvidia, Intel, and Microsoft. Report it daily into my email starting today")
    .email("example@email.com");
```

### Detailed Execution Flow

When you execute a command like `prompt.execute("Automate a daily report summarizing the latest news and stock price movements for Nvidia, Intel, and Microsoft. Report it daily into my email starting today")`, the SDK performs the following steps:

1. **Analyze Intent**: The command is analyzed using OpenAI's GPT-4 model to understand the user's intent. The AI categorizes the tasks and breaks them down into actionable steps.

2. **Structure Actions**: Based on the analyzed intent, the SDK structures an action plan. For the given example, the action plan would be:
    ```
    [!] Action Plan:
    OTE/1   | Gather daily news on NVDA, INTC, and MSFT  | [HEAD]
    OTE/2   | Fetch 1W stock price history               | [CHAINED]
    OTE/3   | Generate summary using LLM                 | [CHAINED]
    OTE/4   | Send & schedule daily email via Brevo      | [CHAINED]
    ```

3. **Execute Actions**: Each action is executed sequentially:
    - **Gather daily news**: The SDK uses a search API integration to fetch the latest news articles related to Nvidia, Intel, and Microsoft.
    - **Fetch stock price history**: The SDK retrieves the past week's stock price data for the specified companies using financial data APIs like AlphaVantage.
    - **Generate summary**: The SDK leverages OpenAI's language model to generate a concise summary of the gathered news and stock data.
    - **Send & schedule email**: The SDK connects to the Brevo API to send and schedule the generated report to the specified email address.

4. **Logging and Monitoring**: Throughout the execution, the SDK logs each step and monitors for any errors or warnings. This ensures transparency and allows for troubleshooting if needed.

### License

This project is licensed under the MIT License.

## Step-by-Step Guide

### Step 1: SDK Initialization and Configs

Seamlessly integrate Taxion with your project using the CommonJS module system. Simply configure essential items that will be executed like API keys and email in the config to unlock powerful automation capabilities.

```javascript
const taxion = require("taxion");

const config = {
    "Telegram_UID": "YOUR-TELEGRAM-UID",
    "Brevo_API-KEY": "YOUR-BREVO-APIKEY",
    "Email": "email@domain.com"
};

const prompt = new Taxion(config);
```

### Step 2: Unleash Intelligent Automation

Let our LLM-powered SDK analyze your request and intelligently chain multiple actions into a structured execution plan. Sit back and watch as Taxion does the heavy lifting for you.

```javascript
prompt.execute("Automate a daily newsletter about BTC and ETH price trends for the past week, and send it to my email.");
```

### Step 3: Watch Taxion Work Its Magic

Watch as our LLM breaks down the actions and executes them step-by-step, providing clarity throughout the entire process. Just wait a minute—and whoops! You've got a new email from Taxion Mail Services.

### Example Action Plan

```
[!] Action Plan:
OTE/1   | Gather daily news on BTC and ETH      | [HEAD]
OTE/2   | Fetch 1W stock price history          | [CHAINED]
OTE/3   | Generate summary using LLM            | [CHAINED]
OTE/4   | Send & schedule daily email via Brevo | [CHAINED]

```

### Essential Items

- `Telegram_API-KEY="YOUR_KEY"`: Send messages, upload images
- `Telegram_UID="YOUR_UID"`: Identify your Telegram user for actions
- `Brevo_API-KEY="YOUR_KEY"`: Automate email campaigns and notifications
- `Email="your.email@domain.com"`: Set up email-based automation
- `Stripe_Auth_Token="YOUR_AUTH_TOKEN"`: Secure authentication for payments
- `Stripe_Campaign_Link="YOUR_LINK"`: Manage payment campaigns seamlessly
- `Dropbox_Bearer_Token="YOUR_TOKEN"`: Upload, share, and access files
- `GoogleDrive_API-KEY="YOUR_KEY"`: Create folders, upload, and share files
- `MetaMask_Wallet="YOUR_WALLET_ADDRESS"`: Authenticate, buy, and sell coins
- `Coinbase_API-KEY="YOUR_KEY"`: Manage wallets, create orders, and cancel trades
- `PumpFun_Wallet="YOUR_WALLET_ADDRESS"`: Launch and trade crypto tokens
- `Redis_Integration_Link="YOUR_LINK"`: Store logs, account keys, and manage connections
