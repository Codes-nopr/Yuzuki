const GuildForceSkip = require("../../Models/GuildForceSkip");

module.exports = {
    name: "setdjrole",
    aliases: ["setdj", "setdjr"],
    cooldown: 2,

    run: async ({ client, message, args }) => {
        if (!message.member.permissions.has("manageGuild")) {
            return message.channel.createMessage({ content: `${client.emote.error} You have not permission to use this command in this server. Required Permission: \`Manage Guild\`` });
        }

        const restMember = await client.getRESTGuildMember(message.guildID, message.author.id);

        const roleID = args[0];
        if (!roleID) return message.channel.createMessage({ content: `${client.emote.error} Please specify a role ID.` });
        if (roleID.length < 18 || roleID.length > 18) return message.channel.createMessage({ content: `${client.emote.error} Are you sure its valid role...?` });

        GuildForceSkip.findOne({
            guild: message.guildID,
        }, async (error, resultData) => {
            if (error) return message.channel.createMessage({ content: `${client.emote.error} Something went wrong while checking data on database.` });
            if (!resultData) {
                // eslint-disable-next-line no-param-reassign
                resultData = new GuildForceSkip({
                    guild: message.guildID,
                    role: roleID,
                }).save().catch(() => message.channel.createMessage({ content: `${client.emote.error} Something went wrong while saving config to database.` }));
                return message.channel.createMessage({ content: `${client.emote.ok} DJ role has been enabled for this server.` });
            }
            return message.channel.createMessage({ content: `${client.emote.error} This server already have DJ role configured.` });
        });
        return null;
    },
};
