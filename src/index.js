/* eslint-disable import/no-dynamic-require */
const { Client } = require("eris");
const { Manager } = require("erela.js");
const { default: Spotify } = require("better-erela.js-spotify");
const Apple = require("erela.js-apple");
const Deezer = require("erela.js-deezer");
const { readdirSync } = require("fs");
require("dotenv").config();

const client = new Client(process.env.TOKEN, {
    allowedMentions: {
        users: false, roles: false, everyone: false, repliedUser: false,
    },
    autoreconnect: true,
    compress: true,
    getAllUsers: false,
    intents: ["guilds", "guildMessages", "guildVoiceStates"],
    maxShards: "auto",
    messageLimit: 50,
    restMode: true,
});

client.commands = new Map();
client.slashCommands = new Map();
client.nodes = require("./Nodes/nodes.json");
client.config = require("./Utility/config");

client.color = client.config.color;
client.error = client.config.error;
client.emote = client.config.emojis;

client.manager = new Manager({
    nodes: client.nodes.lavanodes.nodes,
    send: (id, payload) => {
        const guild = client.guilds.get(id);
        if (guild) guild.shard.sendWS(payload.op, payload.d);
    },
    plugins: [
        new Spotify(),
        new Deezer({}),
        new Apple(),
    ],
});

const guildEvents = readdirSync("./Listeners/Guild").filter((f) => f.endsWith(".js"));

// eslint-disable-next-line no-restricted-syntax
for (const file of guildEvents) {
    // eslint-disable-next-line no-console
    console.log(`Loading guild event: ${file}`);
    // eslint-disable-next-line global-require
    const event = require(`./Listeners/Guild/${file}`);
    client.on(file.event(".")[0], event.bind(null, client));
}

const erelaEvents = readdirSync("./Listeners/Erela").filter((f) => f.endsWith(".js"));

// eslint-disable-next-line no-restricted-syntax
for (const file of erelaEvents) {
    // eslint-disable-next-line no-console
    console.log(`Loading erela event: ${file}`);
    // eslint-disable-next-line global-require
    const event = require(`./Listeners/Erela/${file}`);
    client.manager.on(file.event(".")[0], event.bind(null, client));
}

client.connect();
