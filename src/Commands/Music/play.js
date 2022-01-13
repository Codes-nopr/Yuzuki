module.exports = {
    name: "play",
    aliases: ["p"],
    cooldown: 3,

    run: async ({ client, message, args }) => {
        if (!message.member.voiceState.channelID) return message.channel.createMessage({ content: `${client.emote.error} You need to be in a voice channel before running this command.` });

        if (!client.getChannel(message.member.voiceState.channelID).permissionsOf(client.user.id).has("voiceConnect")) {
            return message.channel.createMessage({ content: `${client.emote.error} I have not permission to join in your voice channel. Required Permission: \`Connect\`` });
        }
        if (!client.getChannel(message.member.voiceState.channelID).permissionsOf(client.user.id).has("voiceSpeak")) {
            return message.channel.createMessage({ content: `${client.emote.error} I have not permission to speak in your voice channel. Required Permission: \`Speak\`` });
        }

        const botVoice = await client.getRESTGuildMember(message.guildID, client.user.id);

        if (botVoice.voiceState.channelID) {
            if (botVoice.voiceState.channelID !== message.member.voiceState.channelID) {
                return message.channel.createMessage({ content: `${client.emote.error} You are not connected to the same voice channel.` });
            }
        }

        if (!args.join(" ")) return message.channel.createMessage({ content: `${client.emote.error} Please provide a track or playlist to play.` });

        const player = client.manager.create({
            guild: message.guildID,
            voiceChannel: message.member.voiceState.channelID,
            textChannel: message.channel.id,
            volume: 100,
            selfDeafen: true,
            selfMute: false,
        });

        if (player.state !== "CONNECTED") player.connect();
        await player.set("autoplay", false);

        const query = await player.search(args.join(" "), message.member);

        // eslint-disable-next-line default-case
        switch (query.loadType) {
            case "LOAD_FAILED":
                if (!player.queue.current) player.destroy();
                message.channel.createMessage({ content: `${client.emote.error} Something went wrong while trying to load the ${Array.isArray(query?.tracks) ? "playlist" : "track"}.` });
            break;

            case "NO_MATCHES":
                if (!player.queue.current) player.destroy();
                message.channel.createMessage({ content: `${client.emote.error} No matches found about your query.` });
            break;

            case "TRACK_LOADED":
                player.queue.add(query.tracks[0]);
                message.channel.createMessage({ content: `${client.emote.ok} Added ${query.tracks[0]?.title ?? "Unknown title"} to the queue.` });
                if (!player.playing && !player.paused && !player.queue.size) player.play();
            break;

            case "PLAYLIST_LOADED":
                player.queue.add(query.tracks);
                message.channel.createMessage({ content: `${client.emote.ok} Added ${query.tracks.length} track(s) in the queue.` });
                if (!player.playing && !player.paused
                    && player.queue.totalSize === query.tracks.length) player.play();
            break;

            case "SEARCH_RESULT":
                player.queue.add(query.tracks[0]);
                message.channel.createMessage({ content: `${client.emote.ok} Added ${query.tracks[0]?.title ?? "Unknown title"} to the queue.` });
                if (!player.playing && !player.paused && !player.queue.size) player.play();
            break;
        }

        return null;
    },
};
