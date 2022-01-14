/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const RichEmbed = require("../../Utility/RichEmbed");
const { convertTime } = require("../../Utility/Utils");

module.exports = {
    name: "queue",
    aliases: ["q", "list", "tracks"],
    cooldown: 2,

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

        if (!player.queue.length) return message.channel.createMessage({ content: `${client.emote.error} No songs in the queue..? Add some tracks` });

        // eslint-disable-next-line prefer-destructuring
        const queue = player.queue;
        const embed = new RichEmbed().setColor(client.color.color);
        const multiple = 10;
        const page = !Number.isNaN(args[0]) ? Number(args[0]) || 1 : 1;
        const end = page * multiple;
        const start = end - multiple;
        const tracks = queue.slice(start, end);
        if (queue.current) embed.addField(`${client.emote.npQueue} Now playing`, `[${queue.current.title ? queue.current.title : "*Playing something*"}](${queue.current.uri})`);
        if (!tracks.length) message.channel.createMessage({ content: `${client.emote.error} No tracks in ${page > 1 ? `page ${page}` : "the queue"}` });
        else embed.setDescription(`${client.emote.queueList} **Queue in ${client.guilds?.get(message.guildID)?.name ?? ""}**\n\n${tracks.map((track, i) => `${client.emote.perTrack} **${start + (++i)}.** \`(${convertTime(track.duration ? track.duration : "Unknown")})\` **${track.title ? `[${track.title}](${track?.uri ?? null})` : "Unknown"}**`).join("\n")?.toString()}`);

        embed.addField(`${client.emote.infoQueue} Info`, `Songs queued: \`${queue.length || "Unknown"}\`\nTrack loop: \`${player.trackRepeat ? "Enabled" : "Disabled"}\`\nQueue loop: \`${player.queueRepeat ? "Enabled" : "Disabled"}\``);
        const maxPages = Math.ceil(queue.length / multiple);
        embed.addField("\u200b", `Page ${page > maxPages ? maxPages : page} of ${maxPages}`);
        return message.channel.createMessage({ embeds: [embed] });
    },
};
