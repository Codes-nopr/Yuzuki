const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    guild: String,
    forceSkipEnabled: String,
});

module.exports = mongoose.model("GuildForceSkip", Schema);
