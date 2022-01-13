module.exports = {
    name: "skipto",
    aliases: ["skt", "sk2"],
    cooldown: 3,

    run: async ({ client, message, args }) => {
        if (!message.member.voiceState.channelID) return message.channel.createMessage({ content: `${client.emote.error} You need to be in a voice channel before running this command.` });

        const botVoice = await client.getRESTGuildMember(message.guildID, client.user.id);

        if (botVoice.voiceState.channelID) {
            if (botVoice.voiceState.channelID !== message.member.voiceState.channelID) {
                return message.channel.createMessage({ content: `${client.emote.error} You are not connected to the same voice channel.` });
            }
        }
        const player = client.manager.get(message.guildID);
        if (!player || !player.queue.current) return message.channel.createMessage({ content: `${client.emote.error} Not playing anything in voice channel.` });

        if (!args[0]) return message.channel.createMessage({ content: `${client.emote.error} You need to provide in which number of track you want to skip.` });
        if (Number.isNaN(args[0])) return message.channel.createMessage({ content: `${client.emote.error} Please provide a valid number of the queue.` });
        player.queue.remove(0, parseInt(args[0], 10) - 1);
        await player.stop();
        client.manager.off("trackStart", () => { }); // Prevent track start after stop the player
        setTimeout(() => {
            message.channel.createMessage({ content: `${client.emote.skipto} Skipped to **${player.queue.current.title}**` });
            client.manager.on("trackStart", () => { }); // We'll send the skipped message first because after stop the track it'll take some time to load another track in client queue, and when done we'll reenable this event and fire it up, kinda small hack lol
        }, 500);
        return null;
    },
};
