module.exports = {
    name: "stop",
    aliases: ["die"],
    cooldown: 2,

    run: async ({ client, message }) => {
        if (!message.member.voiceState.channelID) return message.channel.createMessage({ content: `${client.emote.error} You need to be in a voice channel before running this command.` });

        const botVoice = await client.getRESTGuildMember(message.guildID, client.user.id);

        if (botVoice.voiceState.channelID) {
            if (botVoice.voiceState.channelID !== message.member.voiceState.channelID) {
                return message.channel.createMessage({ content: `${client.emote.error} You are not connected to the same voice channel.` });
            }
        }
        const player = client.manager.get(message.guildID);
        if (!player || !player.queue.current) return message.channel.createMessage({ content: `${client.emote.error} Not playing anything in voice channel.` });

        const autoplay = player.get("autoplay");
        if (autoplay === true) player.set("autoplay", false);
        player.queue.clear();
        player.stop();
        player.destroy();
        return message.channel.createMessage({ content: `${client.emote.stop} **${message.author.username}#${message.author.discriminator}** stopped the music, and leaving voice.` });
    },
};
