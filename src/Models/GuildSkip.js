const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    guild: String,
    voteSkipEnabled: String,
});

module.exports = mongoose.model("GuildSkip", Schema);
