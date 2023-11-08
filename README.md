# Déjà Vu Repair Kit
TODO: Add a better description  
TODO: Add release binaries  
TODO: Add "protocol" documentation


## Description
In an act of privacy protection, Discord removed the ability for bots in more than 100 servers to read message content without authorization from Discord. Unfortunately, Déjà Vu did not meet their requirements and was denied authorization. To combat this, I developed the Déjà Vu Repair Kit to let Déjà Vu see once again.

Does it seem a little silly to have two bots for one job? Try the stand alone Déjà Vu! ***Coming Soon***


## Installing from Binaries
***COMING SOON***  


## Installing from Source
1. Install Node.js v18 and NPM
    - **Windows:** Download the `-x64.msi` installer from [here](https://nodejs.org/download/release/latest-v18.x/)
    - **Linux:** Either use your package manage ([more info here](https://nodejs.org/en/download/package-manager)) or download binaries from [here](https://nodejs.org/download/release/latest-v18.x/)
    - **MacOS:** Download the `.pkg` installer from [here](https://nodejs.org/download/release/latest-v18.x/)
    - **Docker:** I use the `node:18` image with Docker Compose
2. [Create a Discord bot](#creating-a-discord-bot) (see below)
3. Download the source code
    - Click the green "Code" button above, click "Download ZIP", and extract the downloaded ZIP file
    - Or just clone the repo if you know how
4. Open a terminal in the same folder as the source code ([Instructions](https://groovypost.com/howto/open-command-window-terminal-window-specific-folder-windows-mac-linux/))
0. Run `npm install` in the terminal
0. Run `node server.js` in the terminal. It will exit after creating `config.json`
0. Open `config.json` in a text editor
    - Fill in your bot token and [verification channel](#what-is-the-verification-channel-for)
    - Don't forget to save the config file
0. Run `node server.js` again and hopefully everything works


## Creating a Discord Bot
1. Open the [Discord Developer Portal](https://discord.com/developers.applications)
    - If you need to sign in, you will likely be mistakenly taken to the web client. Just backtrack or click the link again.
2. Click **New Application**
3. Give the bot a name and agree to the Developer ToS and Policy.
4. If you want, add an avatar on the **General Information** page
    - I can download my Repair Kit avatar [here](https://github.com/Trainmaster2/Deja-Vu-Repair-Kit/blob/master/assets/avatar.png)
5. Go to the **Bot** page
6. You probably will want to disable **Public Bot**
7. Under **Privileged Gateway Intents**, enable **Message Content Intent**
8. Back at the top of the page, click **Reset Token**, enter your 2FA code if enabled, and then click **Copy** to copy your bot token to the clipboard
    - Do not leave this page until you have saved the token, as you will otherwise have to reset it again


## What is the Verification Channel for?
Since the Repair Kit communicates with Déjà Vu off platform via websockets, the Repair Kit must prove that it is indeed the Discord bot that it claims to be for security reasons. This is done with the following process:

0. All websocket communication includes the user ID for the Repair Kit's Discord bot
1. The Repair Kit sends a verification request to Déjà Vu with a specific channel to use for verification
2. Déjà Vu posts a message to the given channel and sends a random emoji back to the Repair Kit
3. If the Repair Kit can successfully react to the verification message with the given emoji in one second, verification will be successful

The verification channel can be just about any text channel as long as the below requirements are met, so you can use a hidden channel just as easily as general chat.

- Both bots (Déjà Vu and Repair Kit) must be able to access the channel
- Déjà Vu must be able to post text messages to the channel
- Repair Kit must be able to add reactions to messages in the channel

### How to get the Verificaion Channel and Guild IDs
1. In the Discord settings, under **Advanced**, enable **Developer Mode**
2. To copy the guild ID, right click a server icon or name and click **Copy ID**
3. To copy the channel ID, right click the channel name and click **Copy ID**