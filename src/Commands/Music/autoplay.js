module.exports = {
    name: "autoplay",
    aliases: ["au", "ap"],
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

        const isAutoplay = player.get("autoplay");
        if (!isAutoplay) {
            const msg = await message.channel.createMessage({ content: `${client.emote.doing} Enabling autoplay, just some seconds...` });
            const { identifier } = player.queue.current;
            player.set("autoplay", true);
            player.set("requester", message.author);
            player.set("identifier", identifier);
            const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
            const query = await player.search(search, message.author);
            if (query.loadType === "LOAD_FAILED") return message.channel.createMessage({ content: `${client.emote.error} Something went wrong while loading the track.` });
            player.queue.add(Array.isArray(query).length > 1 ? query.tracks : query.tracks[1]);
            await msg.edit({ content: `${client.emote.autoplay} Autoplay has been enabled.` })
            .catch(() => { });
        }
        if (isAutoplay) {
            player.set("autoplay", false);
            return message.channel.createMessage({ content: `${client.emote.autoplay} Autoplay has been disabled.` });
        }
        return null;
    },
};
