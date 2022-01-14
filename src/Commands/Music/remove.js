module.exports = {
    name: "remove",
    aliases: ["rm"],
    cooldown: 3,

    run: async ({ client, message, args }) => {
        if (!message.member.voiceState.channelID) return message.channel.createMessage({ content: `${client.emote.error} You need to be in a voice channel before running this command.` });
        const botVoiceChannel = await client.getRESTGuildMember(message.guildID, client.user.id);

        if (botVoiceChannel.voiceState.channelID) {
            // eslint-disable-next-line max-len
            if (botVoiceChannel.voiceState.channelID !== message.member.voiceState.channelID) {
                return message.channel.createMessage({ content: `${client.emote.error} You are not connected to the same voice channel.` });
            }
        }
        const player = client.manager.get(message.guildID);
        if (!player || !player.queue.current) return message.channel.createMessage({ content: `${client.emote.error} Not playing anything in voice channel.` });

        const rmNum = args[0];
        if (!rmNum) return message.channel.createMessage({ content: `${client.emote.error} You need tp provide a track number to remove.` });
        if (Number.isNaN(rmNum)) return message.channel.createMessage({ content: `${client.emote.error} Please provide track number to remove from queue.` });
        if (rmNum < 1) return message.channel.createMessage({ content: `${client.emote.error} Track number can't be lower than \`1\`.` });
        if (rmNum > player.queue.length) return message.channel.createMessage({ content: `${client.emote.error} Track number can't be higher than queue length.` });
        player.queue.remove(parseInt(rmNum - 1, 10));
        return message.channel.createMessage({ content: `${client.emote.remove} Removed **${rmNum}**th track from queue.` });
    },
};
