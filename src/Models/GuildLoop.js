const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    guild: String,
    guildLoop: String,
});

module.exports = mongoose.model("GuildLoop", Schema);
