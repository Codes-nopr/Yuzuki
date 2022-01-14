const RichEmbed = require("../../Utility/RichEmbed");

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
        const queue = player.queue;
        const embed = new RichEmbed().setColor(client.color.color);
        const multiple = 10;
        const page = Number(args[0]) || 1;
        const end = page * multiple;
        const start = end - multiple;
        const tracks = queue.slice(start, end);
        if (queue.current) embed.addField("Now playing", `${queue.current.title ? queue.current.title : "*Playing something*"}`);
        if (!tracks.length) embed.addField(`No tracks in ${page > 1 ? `page ${page}` : "the queue"}`);
        else embed.setDescription(`__Queue List__\n\n${tracks.map((track, i) => `**${start + (++i)}.** ${track.title ? track.title : "*something cool*"} | \`[${convertTime(track.duration ? track.duration : "Unknown")}]\``).join("\n")?.toString()}`);

        embed.addField("Info", `Songs queued: \`${queue.length || "Unknown"}\`\nTrack loop: \`${player.trackRepeat ? "Enabled" : "Disabled"}\`\nQueue loop: \`${player.queueRepeat ? "Enabled" : "Disabled"}\``);
        const maxPages = Math.ceil(queue.length / multiple);
        embed.addField("\u200b", `Page ${page > maxPages ? maxPages : page} of ${maxPages}`);
    }
}