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
        message.channel.createMessage({ content: "hey", components: [deleteButton] });
    },
};
