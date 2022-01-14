const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    guild: String,
    role: String,
});

module.exports = mongoose.model("GuildForceSkip", Schema);
