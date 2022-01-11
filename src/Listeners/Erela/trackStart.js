module.exports = async (client, player, track) => {
    if (player.trackRepeat === true
        || player.queueRepeat === true) return;
    const channel = await client.getChannel(player?.textChannel);
    await channel.createMessage({ content: `${client.emote.now} Now playing: **${track?.title ?? "Unknown title"}** | Requested by: ${track.requester.username}#${track.requester.discriminator}` });
};
