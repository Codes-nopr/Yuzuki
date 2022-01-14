const GuildForceSkip = require("../../Models/GuildDJRole");

module.exports = {
    name: "loopqueue",
    aliases: ["lq"],
    cooldown: 3,

    run: async ({ client, message }) => {
        if (!message.member.voiceState.channelID) return message.channel.createMessage({ content: `${client.emote.error} You need to be in a voice channel before running this command.` });

        GuildForceSkip.findOne({
            guild: message.guildID,
        }, async (error, resultData) => {
            if (error) return message.channel.createMessage({ content: `${client.emote.error} Something went wrong while checking data on database.` });
            if (resultData) {
                if (!message.member.roles.find((x) => x === resultData.role)) return message.channel.createMessage({ content: `${client.emote.error} **${message.author.username}** you can't use forceskip without DJ role.` });

                const botVoice = await client.getRESTGuildMember(message.guildID, client.user.id);

                if (botVoice.voiceState.channelID) {
                    if (botVoice.voiceState.channelID !== message.member.voiceState.channelID) {
                        return message.channel.createMessage({ content: `${client.emote.error} You are not connected to the same voice channel.` });
                    }
                }
                const player = client.manager.get(message.guildID);
                if (!player || !player.queue.current) return message.channel.createMessage({ content: `${client.emote.error} Not playing anything in voice channel.` });
                player.setQueueRepeat(!player.queueRepeat);
                message.channel.createMessage({ content: `${client.emote.repeat_queue} Track repeat has been ${player.queueRepeat ? "**enabled**" : "**disabled**"}.` });
            } else {
                const botVoice = await client.getRESTGuildMember(message.guildID, client.user.id);

                if (botVoice.voiceState.channelID) {
                    if (botVoice.voiceState.channelID !== message.member.voiceState.channelID) {
                        return message.channel.createMessage({ content: `${client.emote.error} You are not connected to the same voice channel.` });
                    }
                }
                const player = client.manager.get(message.guildID);
                if (!player || !player.queue.current) return message.channel.createMessage({ content: `${client.emote.error} Not playing anything in voice channel.` });
                player.setQueueRepeat(!player.queueRepeat);
                return message.channel.createMessage({ content: `${client.emote.repeat_queue} Track repeat has been ${player.queueRepeat ? "**enabled**" : "**disabled**"}.` });
            }
            return null;
        });
        return null;
    },
};
