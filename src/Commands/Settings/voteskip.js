const GuildSkip = require("../../Models/GuildSkip");

module.exports = {
    name: "voteskip",
    aliases: ["vsk"],
    cooldown: 2,

    run: async ({ client, message }) => {
        if (!message.member.permissions.has("manageGuild")) {
            return message.channel.createMessage({ content: `${client.emote.error} You have not permission to use this command. Required Permission: \`Manage Guild\`` });
        }

        GuildSkip.findOne({
            guild: message.guildID,
        }, async (error, resultData) => {
            if (error) return message.channel.createMessage({ content: `${client.emote.error} Something went wrong while checking data on database.` });
            if (!resultData) {
                // eslint-disable-next-line no-param-reassign
                resultData = new GuildSkip({
                    guild: message.guildID,
                    voteSkipEnabled: "Enabled",
                }).save().catch(() => message.channel.createMessage({ content: `${client.emote.error} Something went wrong while saving config to database.` }));
                message.channel.createMessage({ content: `${client.emote.ok} Vote skip for the server has been enabled.` });
            } else {
                return message.channel.createMessage({ content: `${client.emote.error} Vote skipped already enabled in this server.` });
            }
            return null;
        });
        return null;
    },
};
