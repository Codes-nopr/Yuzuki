module.exports = async (client, player, track) => {
    const channel = await client.getChannel(player?.textChannel);
    await channel.createMessage({ content: `${client.emote.stuck} Something went stuck when trying to continue playing the track, skipping...` });
};
