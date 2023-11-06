# Déjà Vu Repair Kit
TODO: Add a better description  
TODO: Add better instructions  
TODO: Add release binaries  
TODO: Add "protocol" documentation

## Description
In an act of privacy protection, Discord removed the ability for bots in more than 100 servers to read message content without authorization from Discord. Unfortunately, Déjà Vu did not meet their requirements and was denied authorization. To combat this, I developed the Déjà Vu Repair Kit to let Déjà Vu see once again.

Does it seem a little silly to have two bots for one job? Try the stand alone Déjà Vu! ***Coming Soon***

## Instructions
1. Install Node.js 18
2. Create a Discord bot in the [Discord Developer Portal](https://discord.com/developers.applications) (Avatar can be found in assets folder)
3. Download or clone the repo
4. `npm install`
5. Run `node server.js` once to create the config file
6. Edit the config.json to add your bot token and verification channel/guild ids
    - The verification channel is use to associate a websocket connection with a Discord bot. Déjà Vu should be at minimum allowed to post in that channel and the Repair Kit should at minimum be allowed to react in that channel.
7. Run `node server.js` again and hopefully everything works
