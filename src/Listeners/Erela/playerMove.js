module.exports = async (client, player, oldChannel, newChannel) => {
    if (!newChannel) {
        try {
            player.destroy();
        // eslint-disable-next-line no-empty
        } catch { }
    }
    if (newChannel) {
        player.setVoiceChannel(newChannel);
        setTimeout(() => player.pause(false), 1500);
    }
};
