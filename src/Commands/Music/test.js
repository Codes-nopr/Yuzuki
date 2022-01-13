const ErisComponents = require("eris-components");

module.exports = {
    name: "test",
    aliases: [],
    cooldown: 1,

    run: async ({ client, message }) => {
        const options = {
            debug: false,
            invalidClientInstanceError: true,
            ignoreRequestErrors: false,
        };
        const comp = new ErisComponents.Client(client, options);

        const button = new ErisComponents.Button()
        .setLabel("Label")
        .setID("f_id")
        .setStyle("blurple");
        const souce = await comp.sendComponents(message.channel.id, button, "hey");
        const collector = comp.createComponentsCollector(
            (body) => body.data.custom_id === "f_id",
            message.channel.id,
            { time: 10000 },
        );
        collector.on("collect", async (res) => {
            const buttonEdit = new ErisComponents.Button()
            .setLabel("Label")
            .setID("f_id").setStyle("blurple")
            .setDisabled(true);
            await comp.editComponents(souce, buttonEdit, "Yes");
            message.channel.createMessage({ content: "Yes" });
        });
        collector.on('end', (collected) => { // When the collector stops. It can be by time or by call of the stop() method. Collected is an array of all collected resBody's.
            console.log('Collector end. Collected:', collected);
        });
    },
};
