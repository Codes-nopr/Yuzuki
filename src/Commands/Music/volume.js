module.exports = {
    name: "volume",
    aliases: ["vol"],
    cooldown: 2,

    run: async ({ client, message, args }) => {
        if (!message.member.voiceState.channelID) return message.channel.createMessage({ content: `${client.emote.error} You need to be in a voice channel before running this command.` });
        const botVoice = await client.getRESTGuildMember(message.guildID, client.user.id);

        if (botVoice.voiceState.channelID) {
            // eslint-disable-next-line max-len
            if (botVoice.voiceState.channelID !== message.member.voiceState.channelID) {
                return message.channel.createMessage({ content: `${client.emote.error} You are not connected to the same voice channel.` });
            }
        }

        const player = client.manager.get(message.guildID);
        if (!player || !player.queue.current) return message.channel.createMessage({ content: `${client.emote.error} Not playing anything in voice channel.` });

        const volume = args[0];
        if (!volume) return message.channel.createMessage({ content: `${client.emote.error} You need to provide volume level.` });
        if (Number.isNaN(volume)) return message.channel.createMessage({ content: `${client.emote.error} Please provide right volume level.` });
        if (Number(volume) > 200) return message.channel.createMessage({ content: `${client.emote.error} Volume must be lower than \`200\`.` });
        if (Number(volume) < 0) return message.channel.createMessage({ content: `${client.emote.error} Volume must be higher than \`0\`.` });
        player.setVolume(Number(volume));
        return message.channel.createMessage({ content: `${client.emote.ok} Volume level changed to **${volume}%**.` });
    },
};
