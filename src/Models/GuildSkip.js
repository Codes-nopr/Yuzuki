const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    guild: String,
    voteSkipEnabled: String,
});
