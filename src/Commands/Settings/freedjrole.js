const GuildDJRole = require("../../Models/GuildDJRole");

module.exports = {
    name: "freedjrole",
    aliases: ["frdj", "frdjr"],
    cooldown: 2,

    run: async ({ client, message }) => {
        if (!message.member.permissions.has("manageGuild")) {
            return message.channel.createMessage({ content: `${client.emote.error} You have not permission to use this command in this server. Required Permission: \`Manage Guild\`` });
        }

        GuildDJRole.findOne({
            guild: message.guildID,
        }, async (error, resultData) => {
            if (error) return message.channel.createMessage({ content: `${client.emote.error} Something went wrong while checking data on database.` });
            if (resultData) {
                resultData.delete()
                .then(() => message.channel.createMessage({ content: `${client.emote.ok} DJ role has been removed from server.` }))
                .catch(() => message.channel.createMessage({ content: `${client.emote.error} Something went wrong while trying to deleting data from database.` }));
            } else {
                message.channel.createMessage({ content: `${client.emote.error} No DJ role was configured in this server.` });
            }
            return null;
        });
        return null;
    },
};
