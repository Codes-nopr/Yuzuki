module.exports = {
    name: "pause",
    aliases: ["wait", "pau"],
    cooldown: 3,

    run: async ({ client, message }) => {
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

        if (player.playing && player.paused === false) {
            player.pause(true);
            return message.channel.createMessage({ content: `${client.emote.pause} Music has been paused, to resume use \`resume\`.` });
        }
        return message.channel.createMessage({ content: `${client.emote.error} Music is already paused, you need to resume.` });
    },
};
