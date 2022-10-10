const fs = require("node:fs");
const path = require("node:path");
const {Client, Collection, GatewayIntentBits} = require("discord.js");
const Distube = require("distube");
const {SoundCloudPlugin} = require("@distube/soundcloud");
const {SpotifyPlugin} = require("@distube/spotify");
const {YtDlpPlugin} = require("@distube/yt-dlp");
const {TOKEN} = require("./config.json");

const client = new Client
({
    intents:
    [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions
    ]
});

client.distube = new Distube.default(client, 
    {
        searchSongs: 5,
        searchCooldown: 30,
        leaveOnEmpty: true,
        emptyCooldown: 5,
        leaveOnFinish: false,
        leaveOnStop: true,
        nsfw: true,
        plugins: 
        [
            new SoundCloudPlugin(), 
            new SpotifyPlugin
            ({
                parallel: true,
                emitEventsAfterFetching: true,
                api: {
                clientId: "REDACTED",
                clientSecret: "REDACTED",
            },
          }),
            new YtDlpPlugin()
        ]
    })

client.commands = new Collection();
const commandsPath = path.join(__dirname, "./src/commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles)
{
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    //Set the new item in the Collection
    //With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, "./src/events");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventFiles)
{
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if(event.once)
    {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else
    {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

const eventsPathDistube = path.join(__dirname, "./src/events/distube-events");
const eventFilesDistube = fs.readdirSync(eventsPathDistube).filter(file => file.endsWith(".js"));

for (const file of eventFilesDistube)
{
    const filePath = path.join(eventsPathDistube, file);
    const event = require(filePath);
    if(event.once)
    {
        client.distube.once(event.name, (...args) => event.execute(...args));
    }
    else
    {
        client.distube.on(event.name, (...args) => event.execute(...args));
    }
}

global.sentMessage = 0;
global.resultMessage = undefined;

process.on('unhandledRejection', error => 
{
    if(error.code !== 10008)
    {
        console.error('Some unknown error occured:', error)
    }
})

client.login(TOKEN);
