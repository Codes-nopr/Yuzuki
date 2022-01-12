const GuildForceSkip = require("../../Models/GuildForceSkip");

module.exports = {
    name: "forceskip",
    aliases: ["fs"],
    cooldown: 3,

    run: async ({ client, message }) => {
        if (!message.member.voiceState.channelID) return message.channel.createMessage({ content: `${client.emote.error} You need to be in a voice channel before running this command.` });

        GuildForceSkip.findOne({
            guild: message.guildID,
        }, async (error, resultData) => {
            if (error) return message.channel.createMessage({ content: `${client.emote.error} Something went wrong while checking data on database.` });
            if (resultData) {
                if (!message.member.roles.find((x) => x === resultData.role)) return message.channel.createMessage({ content: `${client.emote.error} **${message.author.username}** you can't use forceskip without DJ role.` });

                // eslint-disable-next-line max-len
                const botVoiceChannel = await client.getRESTGuildMember(message.guildID, client.user.id);

                if (botVoiceChannel.voiceState.channelID) {
                    // eslint-disable-next-line max-len
                    if (botVoiceChannel.voiceState.channelID !== message.member.voiceState.channelID) {
                        return message.channel.createMessage({ content: `${client.emote.error} You are not connected to the same voice channel.` });
                    }
                }

                const player = client.manager.get(message.guildID);
                if (!player || !player.queue.current) return message.channel.createMessage({ content: `${client.emote.error} Not playing anything in voice channel.` });
                player.stop();
                return message.channel.createMessage({ content: `${client.emote.skip} Forced skipped **${player.queue.current.title}** | Requested by ${message.author.username}#${message.author.discriminator}` });
            }
            return message.channel.createMessage({ content: `${client.emote.error} Force skip command isn't enabled in this server.` });
        });
        return null;
    },
};
