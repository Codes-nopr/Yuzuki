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
                        emoji: { name: "π΅" },
                        disabled: false,
                    },
                    {
                        type: 2,
                        style: 2,
                        custom_id: "dj",
                        label: "Settings",
                        emoji: { name: "βοΈ" },
                        disabled: false,
                    },
                    {
                        type: 2,
                        style: 2,
                        custom_id: "filters",
                        label: "Filters",
                        emoji: { name: "π" },
                        disabled: false,
                    },
                    {
                        type: 2,
                        style: 4,
                        custom_id: "delete",
                        label: "Delete",
                        emoji: { name: "πΎοΈ" },
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
                        emoji: { name: "π΅" },
                        disabled: true,
                    },
                    {
                        type: 2,
                        style: 2,
                        custom_id: "dj",
                        label: "Settings",
                        emoji: { name: "βοΈ" },
                        disabled: true,
                    },
                    {
                        type: 2,
                        style: 2,
                        custom_id: "filters",
                        label: "Filters",
                        emoji: { name: "π" },
                        disabled: true,
                    },
                    {
                        type: 2,
                        style: 4,
                        custom_id: "delete",
                        label: "Delete",
                        emoji: { name: "πΎοΈ" },
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
                        Β· **addprevious** - Add previous track in queue
                        Β· **autoplay**    - Autoplay tracks from playlist
                        Β· **clearqueue**  - Clear the whole queue list
                        Β· **dups**        - Remove duplicate tracks
                        Β· **forceskip**   - Force skip any track (Only for DJ role)
                        Β· **forward**     - Forward a track in time
                        Β· **loop**        - Loop the track or whole queue
                        Β· **loopqueue**   - Loop the whole queue
                        Β· **looptrack**   - Loop the currect track
                        Β· **nowplaying**  - Shows what's now playing in embed
                        Β· **pause**       - Pause the player
                        Β· **play**        - Play a track or a playlist
                        Β· **queue**       - Shows the whole queue (optional page num)
                        Β· **remove**      - Remove a track from queue
                        Β· **resume**      - Resume a paused track
                        Β· **rewind**      - Rewind a track in time
                        Β· **seek**        - Seek the track time
                        Β· **shuffle**     - Shuffle the whole queue randomly
                        Β· **skip**        - Skip the current track
                        Β· **skipto**      - Skip to a specific track number
                        Β· **stop**        - Stop the player and leave voice channel
                        Β· **unshuffle**   - Unshuffle the queue and revert to back stage
                        Β· **volume**      - Change player volume
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
                            Β· **freedjrole**   - Remove DJ role requirements from server
                            Β· **setdjrole**    - Set DJ role for each server
                            Β· **voteskip**     - Enable / Disable vote skip for each server
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
                            Β· **bass**              - Enable / Disable bass filter
                            Β· **bassboosthigh**     - Enable / Disable bassboosthigh filter
                            Β· **classical**         - Enable / Disable classical filter
                            Β· **darkvador**         - Enable / Disable darkvador filter
                            Β· **eightd**            - Enable / Disable eightd filter
                            Β· **electronic**        - Enable / Disable electronic filter
                            Β· **errape**            - Enable / Disable errape filter
                            Β· **gaming**            - Enable / Disable gaming filter
                            Β· **highfull**          - Enable / Disable highfull filter
                            Β· **highvoice**         - Enable / Disable highvoice filter
                            Β· **karaoke**           - Enable / Disable karaoke filter
                            Β· **lovenightcore**     - Enable / Disable lovenightcore filter
                            Β· **nightcore**         - Enable / Disable nightcore filter
                            Β· **party**             - Enable / Disable party filter
                            Β· **pop**               - Enable / Disable pop filter
                            Β· **radiomix**          - Enable / Disable radiomix filter
                            Β· **rock**              - Enable / Disable rock filter
                            Β· **soft**              - Enable / Disable soft filter
                            Β· **superfast**         - Enable / Disable superfast filter
                            Β· **treblebass**        - Enable / Disable treblebass filter
                            Β· **tremolo**           - Enable / Disable treblebass filter
                            Β· **vaporewave**        - Enable / Disable treblebass filter
                            Β· **vibrato**           - Enable / Disable treblebass filter
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
