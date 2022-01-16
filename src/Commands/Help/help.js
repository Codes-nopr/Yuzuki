const { ComponentInteraction } = require("eris");
const RichEmbed = require("../../Utility/RichEmbed");

module.exports = {
    name: "help",
    aliases: ["h", "cmds"],
    cooldown: 2,

    run: async ({ client, message }) => {
        const musicButton = [
            {
                type: 1,
                components: [
                    {
                        type: 2,
                        style: 1,
                        custom_id: "music",
                        label: "Commands",
                        emoji: { name: "🎵" },
                        disabled: false,
                    },
                    {
                        type: 2,
                        style: 2,
                        custom_id: "dj",
                        label: "Settings",
                        emoji: { name: "⚙️" },
                        disabled: false,
                    },
                    {
                        type: 2,
                        style: 2,
                        custom_id: "filters",
                        label: "Filters",
                        emoji: { name: "📜" },
                        disabled: false,
                    },
                    {
                        type: 2,
                        style: 4,
                        custom_id: "delete",
                        label: "Delete",
                        emoji: { name: "🅾️" },
                        disabled: false,
                    },
                ],
            },
        ];

        const musicButtonsDisabled = [
            {
                type: 1,
                components: [
                    {
                        type: 2,
                        style: 1,
                        custom_id: "music",
                        label: "Commands",
                        emoji: { name: "🎵" },
                        disabled: true,
                    },
                    {
                        type: 2,
                        style: 2,
                        custom_id: "dj",
                        label: "Settings",
                        emoji: { name: "⚙️" },
                        disabled: true,
                    },
                    {
                        type: 2,
                        style: 2,
                        custom_id: "filters",
                        label: "Filters",
                        emoji: { name: "📜" },
                        disabled: true,
                    },
                    {
                        type: 2,
                        style: 4,
                        custom_id: "delete",
                        label: "Delete",
                        emoji: { name: "🅾️" },
                        disabled: true,
                    },
                ],
            },
        ];

        const defEmbed = new RichEmbed()
        .setColor(client.color.color)
        .setDescription("Hey! To see help command click on **Commands** button for settings click **Settings** either to delete the message simply click delete.")
        .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user?.avatar ?? "0"}.png?size=1024`)
        .addField(`${client.emote.src} Source`, "My source code can be found **[here](https://github.com/dragonfirefox/Yuzuki)**")
        .addField(`${client.emote.discordServer} Discord Server`, "Join my Discord **[here](https://discord.gg/snQ8cUUXk6)**")
        .addField(`${client.emote.createdBy} Created by`, "**[Yuuki#9130](https://discord.com/channels/@me/757925432934006807)**");

        const msg = await message.channel.createMessage({
            embeds: [defEmbed],
            components: [musicButton[0]],
        });

        client.on("interactionCreate", async (interaction) => {
            interaction.acknowledge();
            if (interaction instanceof ComponentInteraction) {
                if (interaction.data.component_type === 2
                    && interaction.data.custom_id === "music") {
                        const embed = new RichEmbed()
                        .setColor(client.color.color)
                        .setTitle(`${client.emote.helpCmds} Music Commands`)
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
                        await msg.edit({ embeds: [embed] })
                        .catch(() => { });
                    }

                    if (interaction.data.component_type === 2
                        && interaction.data.custom_id === "dj") {
                            const embed = new RichEmbed()
                            .setColor(client.color.color)
                            .setTitle(`${client.emote.helpDJ} DJ Settings`)
                            .setDescription(`
                            · **freedjrole**   - Remove DJ role requirements from server
                            · **setdjrole**    - Set DJ role for each server
                            · **voteskip**     - Enable / Disable vote skip for each server
                            `);
                            await msg.edit({ embeds: [embed] })
                            .catch(() => { });
                            // eslint-disable-next-line max-len
                    }

                    if (interaction.data.component_type === 2
                        && interaction.data.custom_id === "delete") {
                            await msg.delete()
                            .catch(() => { });
                            client.off("interactionCreate", () => { });
                            client.removeListener("interactionCreate", () => { });
                    }

                    if (interaction.data.component_type === 2
                        && interaction.data.custom_id === "filters") {
                            const embed = new RichEmbed()
                            .setTitle("Music Filters")
                            .setColor(client.color.color)
                            .setDescription(`
                            · **bass**              - Enable / Disable bass filter
                            · **bassboosthigh**     - Enable / Disable bassboosthigh filter
                            · **classical**         - Enable / Disable classical filter
                            · **darkvador**         - Enable / Disable darkvador filter
                            · **eightd**            - Enable / Disable eightd filter
                            · **electronic**        - Enable / Disable electronic filter
                            · **errape**            - Enable / Disable errape filter
                            · **gaming**            - Enable / Disable gaming filter
                            · **highfull**          - Enable / Disable highfull filter
                            · **highvoice**         - Enable / Disable highvoice filter
                            · **karaoke**           - Enable / Disable karaoke filter
                            · **lovenightcore**     - Enable / Disable lovenightcore filter
                            · **nightcore**         - Enable / Disable nightcore filter
                            · **party**             - Enable / Disable party filter
                            · **pop**               - Enable / Disable pop filter
                            · **radiomix**          - Enable / Disable radiomix filter
                            · **rock**              - Enable / Disable rock filter
                            · **soft**              - Enable / Disable soft filter
                            · **superfast**         - Enable / Disable superfast filter
                            · **treblebass**        - Enable / Disable treblebass filter
                            · **tremolo**           - Enable / Disable treblebass filter
                            · **vaporewave**        - Enable / Disable treblebass filter
                            · **vibrato**           - Enable / Disable treblebass filter
                            `);
                            await msg.edit({ embeds: [embed] })
                            .catch(() => { });
                    }
                }
            });

            setTimeout(() => msg.edit({ components: [musicButtonsDisabled[0]] })
            .catch(() => { }), 30000);
    },
};
