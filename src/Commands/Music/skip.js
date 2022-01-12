const voters = [];

module.exports = {
    name: "skip",
    aliases: ["s", "sk"],
    cooldown: 3,

    run: async ({ client, message }) => {
        if (!message.member.voiceState.channelID) return message.channel.createMessage({ content: `${client.emote.error} You need to be in a voice channel before running this command.` });

        const botVoiceChannel = await client.getRESTGuildMember(message.guildID, client.user.id);

        if (botVoiceChannel.voiceState.channelID) {
            if (botVoiceChannel.voiceState.channelID !== message.member.voiceState.channelID) {
                return message.channel.createMessage({ content: `${client.emote.error} You are not connected to the same voice channel.` });
            }
        }
        const player = client.manager.get(message.guildID);
        // eslint-disable-next-line max-len
        const voiceUsers = botVoiceChannel.guild.voiceStates.filter((f) => f.id !== client.user.id).length;

        if (!player || !player.queue.current) return message.channel.createMessage({ content: `${client.emote.error} Not playing anything in voice channel.` });

        if (voters.find((id) => id === message.author.id)) return message.channel.createMessage({ content: `${client.emote.error} You have alreadyed voted for skip` });

        // eslint-disable-next-line max-len
        if (voters.length === (voiceUsers - 1)) {
            voters.splice(0, 0);
            player.stop();
            return message.channel.createMessage({ content: `${client.emote.skip} Skipped **${player.queue.current.title}** | Requested by: ${message.author.username}#${message.author.discriminator}` });
        }
        voters.push(message.author.id);
        return message.channel.createMessage({ content: `${client.emote.ok} ${message.author.username} requested to skip, vote...` });
    },
};
