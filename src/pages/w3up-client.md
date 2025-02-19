# `w3up-client`

You can easily integrate Storacha into your JavaScript apps using `w3up-client`, our JavaScript client for the w3up platform.

In this guide, we'll walk through the following steps:

1. [Installing the client library](#install)
2. [Creating and provisioning your first space](#create-and-provision-a-space)
3. [Uploading a file or directory](#upload-files)
4. [Viewing your file with IPFS](#view-your-file-on-an-ipfs-gateway)

## Install

You'll need [Node](https://nodejs.com) version 22 or higher, with NPM version 7 or higher to complete this guide.
You can check your local versions like this:

```bash
node --version && npm --version
```

Add the library to your project's dependencies:

```bash
npm install @web3-storage/w3up-client
```

To use the client, import and call the `create` function:

```js
import { create } from "@web3-storage/w3up-client";

const client = await create();
```

See the [w3up-client README](https://github.com/storacha/w3up/blob/main/packages/w3up-client/README.md) for more creation options.

## Create and Provision a Space

Each uploaded thing to Storacha is associated with a "Space". A space is a unique identifier that acts as a namespace for your content. Spaces are identified by a DID (decentralized identifier) using keys created locally on your devices.

The first thing to do is login your Agent with your email address. Calling `login` will cause an email to be sent to the given address. Once a user clicks the confirmation link in the email, the `login` method will resolve. Make sure to check for errors, as `login` will fail if the email is not confirmed within the expiration timeout. Authorization needs to happen only once per agent.

```js
const account = await client.login("zaphod@beeblebrox.galaxy");
```

If your account doesn't have a payment plan yet, you'll be prompted to select one after verifying your email. A payment plan is required to provision a space. You can use the following loop to wait until a payment plan is selected:

```js
// Wait for a payment plan with a 1-second polling interval and 15-minute timeout
await account.plan.wait();
```

Spaces can be created using the `createSpace` client method.

```js
const space = await client.createSpace("my-awesome-space", { account });
```

Alternatively, you can use the `w3cli` command [`w3 space create`](https://github.com/storacha/w3cli#w3-space-create-name) for a streamlined approach.

**Additional Notes**

1.  :warning: **Important**
    If you do not provide the `account` parameter when creating a space, you risk losing access to your space in case of device loss or credential issues.

2.  **Account Parameter**\
    Supplying an `account` in the options automatically provisions a delegated recovery account. This enables you to store data securely and delegate access to the recovery account, allowing access to your space from other devices as long as you have your account credentials.

3.  **Name Parameter**\
    The `name` parameter is optional. If provided, it will be stored in your client’s local state and can serve as a user-friendly identifier for interfaces.

4.  **Current Space**

    - If this is your Agent's first space, it will be automatically set as the "current space."
    - For additional spaces, you can manually set a new space as the current one using:

    ```js
    await client.setCurrentSpace(space.did());
    ```

5.  **Authorized Gateways**

    When creating a space, you can specify which Gateways are authorized to serve the content you upload. By default, if no other flags are set the client will automatically grant access to the [Storacha Gateway](https://github.com/storacha/freeway) to serve the content you upload to your space.

    However, you can authorize other Storacha compliant gateways to serve content instead.

    To achieve this, you must first establish a connection with the desired Gateway. This connection enables the client to publish the necessary delegations that grant the Gateway permission to serve your content.

    To configure other Gateways to serve the content you upload to your new space, follow these steps:

    ```js
    import * as UcantoClient from '@ucanto/client'
    import { HTTP } from '@ucanto/transport'
    import * as CAR from '@ucanto/transport/car'

    // Connects to Storacha Freeway Gateway
    const storachaGateway = UcantoClient.connect({
        id: id,
        codec: CAR.outbound,
        channel: HTTP.open({ url: new URL('https://w3s.link') }),
    });
    ```

    Once connected to the Gateway, you can create a space and authorize serving content from that gateway:

    ```js
    const space = await client.createSpace("my-awesome-space", { 
      account,
      authorizeGatewayServices: [storachaGateway],
    });
    ```

    If you want to ensure that no Gateway is authorized to serve the content of your space, you can use the `skipGatewayAuthorization` flag:

    ```js
    const space = await client.createSpace("my-awesome-space", { 
      account,
      skipGatewayAuthorization: true,
    });
    ```

## Upload Files

Now that you've created and provisioned a space, you're ready to upload files to Storacha!

Call `uploadFile` to upload a single file, or `uploadDirectory` to upload multiple files.

`uploadFile` expects a "Blob like" input, which can be a [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) or [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) when running in a browser. On Node.js, see the [`files-from-path` library](https://github.com/storacha/files-from-path), which can load compatible objects from the local filesystem.

`uploadDirectory` requires `File`-like objects instead of `Blob`s, as the file's `name` property is used to build the directory hierarchy.

You can control the directory layout and create nested directory structures by using `/` delimited paths in your filenames:

```js
const files = [
  new File(["some-file-content"], "readme.md"),
  new File(["import foo"], "src/main.py"),
  new File([someBinaryData], "images/example.png"),
];

const directoryCid = await client.uploadDirectory(files);
```

In the example above, `directoryCid` resolves to an IPFS directory with the following layout:

```text
.
├── images
│   └── example.png
├── readme.md
└── src
    └── main.py
```

## View Your File on an IPFS Gateway

The `uploadFile` and `uploadDirectory` methods described in the previous step both return a CID, or Content Identifier - a unique hash of the data.

To create a link to view your file on an IPFS gateway, create a URL of the form `https://${cid}.ipfs.${gatewayHost}`, where `${cid}` is the CID of the content you want to view, and `${gatewayHost}` is the domain of the gateway. To use our own gateway at `w3s.link`, your URL would be `https://${cid}.ipfs.w3s.link`.

Opening the gateway URL in a browser will take you to your uploaded file, or a directory listing of files, depending on what you uploaded.

Of course, gateways aren't the only option for fetching data from IPFS! If you're running a [kubo](https://github.com/ipfs/kubo) node, you can use [`ipfs get <your-cid>`](https://docs.ipfs.tech/reference/kubo/cli/#ipfs-get) to fetch your content from the peer-to-peer IPFS Bitswap network.
