const ms = require("ms");
const { createProgressBar, format } = require("../../Utility/Utils");
const RichEmbed = require("../../Utility/RichEmbed");

module.exports = {
    name: "nowplaying",
    aliases: ["np"],
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

        const embed = new RichEmbed()
        .setColor(client.color.color)
        .setDescription(`${client.emote.nowplaying} Playing: [**__${player.queue.current.title}__**](${player.queue.current.uri})`)
        .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
        .addField(`${client.emote.npTime} Duration`, `\`${format(player.queue.current.duration)}\``, true)
        .addField(`${client.emote.npLength} Queue length`, `\`${player.queue.length} song(s)\``, true)
        .addField(`${client.emote.npProgress} Progress`, `${createProgressBar(player.position, player.queue.current.duration, 15).Bar} [\`${ms(player.position, { long: false })} / ${ms(player.queue.current.duration, { long: true })}\`]`);

        message.channel.createMessage({ embeds: [embed] });
        return null;
    },
};
