const RichEmbed = require("../../Utility/RichEmbed");

const cooldowns = new Map();

module.exports = async (client, message) => {
    if (!message.guildID) return null;
    if (message.member.user.bot) return null;

    const regex = new RegExp(`^<@!?${client.user.id}> `);
    const prefix = message.content.match(regex) ? message.content.match(regex)[0] : "?";

    try {
        if (!message.content.startsWith(prefix)) return null;
        const args = message.content.slice(prefix.length).split(/ +/g);
        const cmd = args.shift()?.toLowerCase();
        const command = client.commands.get(cmd)
        || client.commands.find((x) => x.aliases && x.aliases.includes(cmd));

        if (!cooldowns.has(command.name?.toLowerCase())) {
            cooldowns.set(command.name?.toLowerCase(), new Map());
        }

        const now = Date.now();
        const timeStamp = cooldowns.get(command.name);
        const cooldownAmount = command.cooldown * 1000;

        if (timeStamp.has(message.author.id)) {
            const then = timeStamp.get(message.author.id) + cooldownAmount;

            if (now < then) {
                const timeLeft = (then - now) / 1000;
                // eslint-disable-next-line consistent-return
                return message.channel.send({ embeds: [new RichEmbed().setColor(client.color.color).setDescription(`Wooah, please wait **${timeLeft.toFixed(2)}** seconds before using this command.`)] });
            }
        }

        timeStamp.set(message.author.id, now);
        setTimeout(() => timeStamp.delete(message.author.id), cooldownAmount);

        try {
            command.run({ client, message, args });
        // eslint-disable-next-line no-empty
        } catch { }
    // eslint-disable-next-line no-empty
    } catch { }

    return null;
};
