module.exports = {
    name: "invite",
    aliases: ["inv", "get"],
    cooldown: 2,

    run: async ({ client, message }) => message.channel.createMessage({ content: `${client.emote.invite} Invite me https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=828965456896` }),
};
