module.exports = async (client, player, oldChannel, newChannel) => {
    if (newChannel || !newChannel) {
        try {
            player.destroy();
            return null;
        // eslint-disable-next-line no-empty
        } catch { }
    }
    return null;
};
