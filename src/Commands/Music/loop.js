module.exports = {
    name: "loop",
    aliases: ["lp"],
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

        if (!args[0]) return message.channel.createMessage({ content: `${client.emote.error} Please provide a mode \`track\` either \`queue\`.` });
        switch (args[0]) {
            case "track":
                if (player.queueRepeat === true) player.setQueueRepeat(false);
                player.setTrackRepeat(!player.trackRepeat);
                message.channel.createMessage({ content: `${client.emote.repeat_track} Current track repeat has been ${player.trackRepeat ? "**enabled**" : "**disabled**"}.` });
            break;

            case "queue":
                if (player.trackRepeat === true) player.setTrackRepeat(false);
                player.setQueueRepeat(!player.queueRepeat);
                message.channel.createMessage({ content: `${client.emote.repeat_queue} Current queue repeat has been ${player.queueRepeat ? "**enabled**" : "**disabled**"}.` });
            break;

            default:
                message.channel.createMessage({ content: `${client.emote.error} You have provided a wrong mode, please provide a valid mode \`track\` either \`queue\`.` });
            break;
        }
        return null;
    },
};
