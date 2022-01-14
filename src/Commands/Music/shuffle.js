module.exports = {
    name: "shuffle",
    aliases: ["shuf", "random"],
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

        if (player.queue.length <= 3) return message.channel.createMessage({ content: `${client.emote.error} There must be more than \`3\` tracks in queue to shuffle...add some..?` });
        if (player.get("beforeshuffle")) return message.channel.createMessage({ content: `${client.emote.error} Queue already shuffled ${client.emote.alreadyShuffled}` });

        player.set("beforeshuffle", player.queue.map((track) => track));
        player.queue.shuffle();
        return message.channel.createMessage({ content: `${client.emote.shuffled} Shuffled **${player.queue.length}** tracks.` });
    },
};
