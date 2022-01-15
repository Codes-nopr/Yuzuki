const RichEmbed = require("../../Utility/RichEmbed");

module.exports = {
    name: "help",
    aliases: ["h", "cmds"],
    cooldown: 2,

    run: async ({ client, message }) => {
        const deleteButton = {
            type: 1,
            components: [
                {
                    type: 2,
                    style: 4,
                    custom_id: "delete",
                    emoji: { name: "🅾️" },
                    disabled: false,
                },
            ],
        };
        const embed = new RichEmbed()
        .setColor(client.color.color)
        .setTitle(`${client.emote.helpCmds}`)
        // .setDescription("List of commands of my here")
        .setDescription(`
        · **addprevious** - Add previous track in queue
        · **autoplay**    - Autoplay tracks from playlist
        · **clearqueue**  - Clear the whole queue list
        · **dups**        - Remove duplicate tracks
        · **forceskip**   - Force skip any track (Only for DJ role)
        · **forward**     - Forward a track in time
        · **loop**        - Loop the track or whole queue
        · **loopqueue**   - Loop the whole queue
        · **looptrack**   - Loop the currect track
        · **nowplaying**  - Shows what's now playing in embed
        · **pause**       - Pause the player
        · **play**        - Play a track or a playlist
        · **queue**       - Shows the whole queue (optional page num)
        · **remove**      - Remove a track from queue
        · **resume**      - Resume a paused track
        · **rewind**      - Rewind a track in time
        · **seek**        - Seek the track time
        · **shuffle**     - Shuffle the whole queue randomly
        · **skip**        - Skip the current track
        · **skipto**      - Skip to a specific track number
        · **stop**        - Stop the player and leave voice channel
        · **unshuffle**   - Unshuffle the queue and revert to back stage
        · **volume**      - Change player volume
        `);
        message.channel.createMessage({ embeds: [embed], components: [deleteButton] });
    },
};
