module.exports = {
    name: "clearqueue",
    aliases: ["cq"],
    cooldown: 2,

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

        const q = player.queue.length;
        if (q < 1) return message.channel.createMessage({ content: `${client.emote.error} Only **1** track in the queue, which is currently playing, *how I suppose to clear it..?*` });
        player.queue.clear();
        return message.channel.createMessage({ content: `${client.emote.cleared} Cleared **${q}** tracks from queue.` });
    },
};
