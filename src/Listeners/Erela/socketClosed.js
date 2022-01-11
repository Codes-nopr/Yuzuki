module.exports = async (client, player) => {
    if (player.queue.size >= 1) player.queue.clear();
    try {
        player.destroy();
    // eslint-disable-next-line no-empty
    } catch { }
};
