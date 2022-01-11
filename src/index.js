const { Client } = require("eris");
const { Manager } = require("erela.js");
const { default: Spotify } = require("better-erela.js-spotify");
const Apple = require("erela.js-apple");
const Deezer = require("erela.js-deezer");
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
