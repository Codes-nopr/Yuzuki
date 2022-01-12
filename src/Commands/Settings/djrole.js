const GuildForceSkip = require("../../Models/GuildForceSkip");

module.exports = {
    name: "djrole",
    aliases: ["dj", "djr"],
    cooldown: 2,

    run: async ({ client, message, args }) => {
        if (!message.member.permissions.has("manageGuild")) {
            return message.channel.createMessage({ content: `${client.emote.error} I have not permission to join in your voice channel. Required Permission: \`Manage Guild\`` });
        }

        const roleName = args[0];
        const findRole = roleName || message.guild.roles.find((x) => x.name === roleName)
        || message.guild.roles.find((x) => x.id === roleName);

        GuildForceSkip.findOne({
            guild: message.guildID,
        }, async (error, resultData) => {
            if (error) return message.channel.createMessage({ content: `${client.emote.error} Something went wrong while checking data on database.` });
            if (!resultData) {
                // eslint-disable-next-line no-param-reassign
                resultData = new GuildForceSkip({
                    guild: message.guildID,
                    role: findRole,
                }).save().catch(() => message.channel.createMessage({ content: `${client.emote.error} Something went wrong while saving config to database.` }));
                return message.channel.createMessage({ content: `${client.emote.ok} DJ role has been enabled for this server.` });
            }
            resultData.delete().catch(() => message.channel.createMessage({ content: `${client.emote.error} Something went wrong while saving config to database.` }));
            return message.channel.createMessage({ content: `${client.emote.ok} DJ role has been disabled in this server.` });
        });
        return null;
    },
};
