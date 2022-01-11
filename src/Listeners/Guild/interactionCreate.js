/* eslint-disable no-tabs */
const { CommandInteraction } = require("eris");
const RichEmbed = require("../../Utility/RichEmbed");

const cooldowns = new Map();

module.exports = async (client, interaction) => {
	if (!interaction.guildID) return interaction.createMessage({ content: `${client.emotes.error} Commands can only run in server not in DM's`, flags: 64 });
	if (interaction.member.user.bot) return null;

	const args = [];
	const cmd = client.slashCommands.get(interaction.data.name);
	if (interaction instanceof CommandInteraction) {
		// eslint-disable-next-line no-restricted-syntax
		for (const option of Object.keys(interaction.data)) {
			if (option.type === 1) {
				if (option.name) args.push(option.name);
					option.options?.forEach((x) => {
						if (x.value) args.push(x.value);
					});
			} else if (option.value) args.push(option.value);
		}
	}

	if (!cooldowns.has(cmd?.name)) {
		cooldowns.set(cmd?.name, new Map());
	}

	const currentTime = Date.now();
	const timeStamps = cooldowns.get(cmd?.name);
	const cooldownAmount = (cmd.cooldown) * 1000;

	if (timeStamps.has(interaction?.member.user.id)) {
		const expirationTime = timeStamps.get(interaction?.member.user.id) + cooldownAmount;
		if (currentTime < expirationTime) {
			const timeLeft = (expirationTime - currentTime) / 1000;
			return interaction.createMessage({ embeds: [new RichEmbed().setColor(client.color.color).setDescription(`⏰ Please wait \`${timeLeft.toFixed(2)}\` seconds, before using \`${cmd.name}\` command`)] });
		}
	}

	timeStamps.set(interaction.member.user.id, currentTime);
	setTimeout(() => timeStamps.delete(interaction.member.user.id), cooldownAmount);
	try {
		cmd.run(client, interaction, args);
	// eslint-disable-next-line no-empty
	} catch (e) { }

	return null;
};
