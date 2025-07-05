# Quickstart

Ready to get started using Storacha? Get up and running in minutes by following this quickstart guide. In this guide, we'll walk through the following steps:

1. Install the CLI.
2. Create a Space to upload your files and register it with Storacha.
3. Upload a file.
4. Get your uploaded file using your browser or curl.

This guide uses our CLI tool since it's the fastest way to get started using Storacha. In the "How-To" section of the docs, we also include instructions on using the Javascript client or web interface to create an account, store data, and more.

## You Will Need

Node.js version `18` or higher and npm version `7` or higher to complete this guide. Check your local versions like this:

```shell
node --version && npm --version

> v18.17.1
> 7.18.1
```

Install the CLI from npm using your command line:

```sh
npm install -g @storacha/cli
```

## Create an Account

You need to create a Storacha account associated with an email address and set it up so you can start uploading to a Space. The Space is created locally and associated with a private key. Then the Space is registered with Storacha and associated with your email address. But don't worry about keeping track of the Space's private key! Storacha's email authorization system allows this private key to be treated as a throwaway key.

1. Run `storacha login alice@example.com` in the command line using your email address. This will send an email to your inbox with a link for validation.
2. Once you click on the validation link, you'll be taken to a webpage where you can select a plan (like our Starter tier).
3. Create a new Space for storing your data and register it:

```sh
storacha space create Documents # pick a good name! you can't change it later
```

## Upload

You can now upload a file or directory using the command line:

```sh
storacha up lets-go.txt 
  1 file 0.9KB
🐔 Stored 1 file
🐔 https://storacha.link/ipfs/bafybeiaadqdddryecmilzvewulbo4gtuwxvwvn7gk2nsbfk6q7yjsxzeue
```

The CLI content-addresses your files, packs them into 1 or more CAR files, and uploads them to Storacha for indexing and inclusion in Filecoin storage deals. It will show an HTTP gateway URL that includes the content CID (content identifier) of your upload e.g:

https://storacha.link/ipfs/bafybeiaadqdddryecmilzvewulbo4gtuwxvwvn7gk2nsbfk6q7yjsxzeue

By default, the CLI will wrap files in a folder, so that their filename is preserved. They can then be accessed directly by adding their name in the URL path:

https://storacha.link/ipfs/bafybeiaadqdddryecmilzvewulbo4gtuwxvwvn7gk2nsbfk6q7yjsxzeue/lets-go.txt

## Get Your File

Your upload is now available over the public IPFS network using the content CID of your upload. The easiest way to fetch it is using the link that `storacha up` provided to the `storacha.link` gateway. The `storacha.link` gateway is optimized for content uploaded to Storacha.

```sh
➜ curl -L 'https://storacha.link/ipfs/bafybeiaadqdddryecmilzvewulbo4gtuwxvwvn7gk2nsbfk6q7yjsxzeue/lets-go.txt'
 ________  _________  ________  ________  ________  ________  ___  ___  ________     
|\   ____\|\___   ___\\   __  \|\   __  \|\   __  \|\   ____\|\  \|\  \|\   __  \    
\ \  \___|\|___ \  \_\ \  \|\  \ \  \|\  \ \  \|\  \ \  \___|\ \  \\\  \ \  \|\  \   
 \ \_____  \   \ \  \ \ \  \\\  \ \   _  _\ \   __  \ \  \    \ \   __  \ \   __  \  
  \|____|\  \   \ \  \ \ \  \\\  \ \  \\  \\ \  \ \  \ \  \____\ \  \ \  \ \  \ \  \ 
    ____\_\  \   \ \__\ \ \_______\ \__\\ _\\ \__\ \__\ \_______\ \__\ \__\ \__\ \__\
   |\_________\   \|__|  \|_______|\|__|\|__|\|__|\|__|\|_______|\|__|\|__|\|__|\|__|
   \|_________|                                                                      
```

You can also fetch your content p2p style over bitswap with an IPFS implementation like `helia` or `kubo`.

```sh
ipfs cat bafybeiaadqdddryecmilzvewulbo4gtuwxvwvn7gk2nsbfk6q7yjsxzeue/lets-go.txt
 ________  _________  ________  ________  ________  ________  ___  ___  ________     
|\   ____\|\___   ___\\   __  \|\   __  \|\   __  \|\   ____\|\  \|\  \|\   __  \    
\ \  \___|\|___ \  \_\ \  \|\  \ \  \|\  \ \  \|\  \ \  \___|\ \  \\\  \ \  \|\  \   
 \ \_____  \   \ \  \ \ \  \\\  \ \   _  _\ \   __  \ \  \    \ \   __  \ \   __  \  
  \|____|\  \   \ \  \ \ \  \\\  \ \  \\  \\ \  \ \  \ \  \____\ \  \ \  \ \  \ \  \ 
    ____\_\  \   \ \__\ \ \_______\ \__\\ _\\ \__\ \__\ \_______\ \__\ \__\ \__\ \__\
   |\_________\   \|__|  \|_______|\|__|\|__|\|__|\|__|\|_______|\|__|\|__|\|__|\|__|
   \|_________|                                                                      
```

## Next Steps

Congratulations! You've just covered the basics of Storacha. To learn more, take a look at these useful resources:

- For a deep dive into storing files, including using the Javascript client to do so, visit the [How to Upload guide](/how-to/upload).
- Read and learn about the power of [UCANs and IPFS](/concepts/ucans-and-storacha) and the various options to integrate Storacha with your application.
