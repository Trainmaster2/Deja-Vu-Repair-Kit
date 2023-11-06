const fs = require("node:fs");
const path = require("node:path");
const { Client, Events, GatewayIntentBits, OAuth2Scopes, PermissionFlagsBits } = require("discord.js");
const WebSocket = require("ws");
const {encode, decode, Map} = require("messagepack");

const configPath = path.join(__dirname, "config.json")
if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, `{
    "token": "BOT_TOKEN_HERE",
    "appear_invisible": false,
    "deja_server": "wss://bots.trainmaster2.net/deja-vu/ws",
    "verification_guild": "VERIFICATION_GUILD_ID_HERE",
    "verification_channel": "VERIFICATION_CHANNEL_ID_HERE"
}`);
    console.log("Config file not found. Created template config file. Exiting.");
    return;
}
const { token, appear_invisible, deja_server, verification_guild, verification_channel } = require(configPath)

let ws = null

function checkString(value) {
    return typeof(value) === "string"
}

function createWebsocket() {
    ws = new WebSocket(deja_server, client.user.id);

    ws.on("open", () => ws.send(encode({request: "VERIFICATION_REQUEST", guild: verification_guild, channel: verification_channel})))

    ws.on("close", () => setTimeout(() => createWebsocket(), 10000))
    ws.on("error", (event) => null)

    ws.on("message", (wsMessage) => {
        wsMessage = decode(wsMessage, Map)
        if (wsMessage.request) {
            switch(wsMessage.request) {
                case "VERIFICATION_RESPONSE": {
                    if (checkString(wsMessage.guild) && checkString(wsMessage.channel) && checkString(wsMessage.message) && checkString(wsMessage.emoji)) {
                        if (wsMessage.guild == verification_guild && wsMessage.channel == verification_channel) {
                            client.guilds.resolve(verification_guild).channels.resolve(verification_channel).messages.resolve(wsMessage.message).react(wsMessage.emoji)
                        }
                    }
                    break
                }
                case "MESSAGES_REQUEST": {
                    if (checkString(wsMessage.key) && checkString(wsMessage.guild) && checkString(wsMessage.channel) && checkString(wsMessage.lastMessage)) {
                        const guild = client.guilds.resolve(wsMessage.guild)
                        if (guild) {
                            const channel = guild.channels.resolve(wsMessage.channel)
                            if (channel) {
                                channel.messages.fetch(wsMessage.lastMessage).then(async (lastMessage) => {
                                    const previousMessages = await channel.messages.fetch({limit: 99, before: wsMessage.lastMessage})
                                    const messages = [lastMessage, ...Array.from(previousMessages.values())].filter(m => !m.author.bot && !m.deleted).map(m => { return { content: m.content, files: Array.from(m.attachments.values())} } )
                                    ws.send(encode({request: "MESSAGES_RESPONSE", key: wsMessage.key, guild: wsMessage.guild, channel: wsMessage.channel, lastMessage: wsMessage.lastMessage, messages: messages}))
                                }).catch(e => null)
                            }
                        }
                    }
                    break
                }
            }
        }
    })

}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once(Events.ClientReady, async (bot) => {
    console.log("Started", new Date().toString());
    console.log(client.generateInvite({
        scopes: [
            OAuth2Scopes.Bot,
        ],
        permissions: [
            PermissionFlagsBits.ReadMessageHistory,
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.AddReactions,
        ],
    }));
    if (appear_invisible) {
        console.log("Going invisible...")
        await client.user.setStatus("invisible")
    }
    console.log("Creating websocket...")
    createWebsocket()
    console.log(`Ready in ${bot.guilds.cache.size} guild(s).`);
});

client.login(token);

