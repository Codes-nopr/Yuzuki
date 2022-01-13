const ms = require("ms");

module.exports = {
    name: "rewind",
    aliases: ["rw"],
    cooldown: 3,

    run: async ({ client, message, args }) => {
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

        const time = args[0];
        if (!time) return message.channel.createMessage({ content: `${client.emote.error} You need to provide a time of position.` });
        let seekTime = Number(player.position) - ms(time);
        if (seekTime >= player.queue.current.duration - player.position || seekTime < 0) {
            seekTime = 1;
        }
        if (Number.isNaN(seekTime)) return message.channel.createMessage({ content: `${client.emote.error} Please provide correct time value.` });
        await player.seek(seekTime);

        return message.channel.createMessage({ content: `${client.emote.rewind} Rewinded **${ms(seekTime, { long: true })}**` });
    },
};
