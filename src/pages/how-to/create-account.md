# How to Create an Account

In this how-to guide, you'll learn how to to create an account.

Anyone can use [console.storacha.network](https://console.storacha.network) to create an account and manage their storage using a web browser. Developers can use the CLI or the JS/Go client libraries. We recommend that developers get familiar with the CLI since it's a powerful tool for many things you might want to do.

## Using the CLI

The easiest way to create an account is using the CLI.

1. Install the CLI from npm using your command line: `npm install -g @storacha/cli`.
2. Run `storacha login alice@example.com` in the command line using your email address. This will send an email to your inbox with a link for validation.
3. Once you click on the validation link, you'll be taken to a webpage where you can enter your payment information and select a plan (like our Free tier).
4. Now you have created an account.

Further information can be found in our [CLI guide](../cli.mdx).

## Using `console.storacha.network`

1. Visit [console.storacha.network](https://console.storacha.network).
2. If you don't have an account, the website will ask you for your email address. Enter your email address and submit the form.
3. Check your email for a message from Storacha including a link to confirm your intention to authenticate using the email you provided.

## Using the JS Client

1. Install the client library from npm using your command line: `npm install @storacha/client`.
2. Call `client.login('alice@example.com')`, and wait for the promise to resolve. This will send an email to your inbox with a link for validation.
3. Once you click on the validation link, you'll be taken to a webpage where you can enter your payment information and select a plan (like our Free tier).
4. Now you have created an account.

Further information can be found in our [JS client guide](../js-client.md).
