const GuildSkip = require("../../Models/GuildSkip");

let voters = [];

module.exports = {
    name: "skip",
    aliases: ["s", "sk"],
    cooldown: 3,

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

        GuildSkip.findOne({
            guild: message.guildID,
        }, async (error, resultData) => {
            if (error) return message.channel.createMessage({ content: `${client.emote.error} Something went wrong while checking data on database.` });

            if (!resultData) {
                player.stop();
                return message.channel.createMessage({ content: `${client.emote.skip} Skipped **${player.queue.current.title}** | Requested by: ${message.author.username}#${message.author.discriminator}` });
            }
            // eslint-disable-next-line max-len
            const voiceUsers = botVoice.guild.voiceStates.filter((f) => f.id !== client.user.id).length;
            if (voters.find((id) => id === message.author.id)) return message.channel.createMessage({ content: `${client.emote.error} You have alreadyed voted for skip` });

            // eslint-disable-next-line max-len
            if (voters.length === (voiceUsers - 1)) {
                voters = [];
                player.stop();
                return message.channel.createMessage({ content: `${client.emote.skip} Skipped **${player.queue.current.title}** | Voted by: **${voiceUsers > 1 ? voiceUsers : `${message.author.username}#${message.author.discriminator}`}** ${voiceUsers > 1 ? "users" : ""}` });
            }
            voters.push(message.author.id);
            return message.channel.createMessage({ content: `${client.emote.ok} ${message.author.username} requested to skip, vote...` });
        });
        return null;
    },
};
