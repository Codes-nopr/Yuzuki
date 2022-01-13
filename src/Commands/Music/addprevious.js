module.exports = {
    name: "addprevious",
    aliases: ["addp", "pre"],
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

        if (!player.queue?.previous?.uri) return message.channel.createMessage({ content: `${client.emote.error} There's actually no track that previously played...` });
        const query = await player.search(player.queue.previous.uri, message.author);
        if (query.loadType === "LOAD_FAILED") return message.channel.createMessage({ content: `${client.emote.error} Something went wrong while trying to load the ${Array.isArray(query?.tracks) ? "playlist" : "track"}.` });
        player.queue.add(Array.isArray(query?.tracks).length > 1 ? query.tracks : query.tracks[0]);
        return message.channel.createMessage({ content: `${client.emote.ok} Added previous ${Array.isArray(query?.tracks).length > 1 ? "playlist" : player.queue.previous.title}` });
    },
};
