module.exports = {
    name: "node",
    aliases: [],
    cooldown: 2,


    run: async ({ client, message }) => {
        console.log(client.manager.nodes);
    }
}