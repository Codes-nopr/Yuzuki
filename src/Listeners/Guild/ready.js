/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-tabs */
const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

module.exports = async (client, interaction) => {
	client.editStatus("online", { name: "with /help" }, 0);
	// eslint-disable-next-line no-param-reassign
	client.slashCommands = new Map();
    const slashCommands = await globPromise(
        `${process.cwd()}/Slash/*/*.js`,
    );
	const arrayOfSlashCommands = [];
    slashCommands.map(async (value) => {
        const file = require(value);
        if (!file.name) return;
        // eslint-disable-next-line no-console
        console.log(`Registering slash command: ${file.name}`);
		client.slashCommands.set(file.name, file);
		arrayOfSlashCommands.push(file);
	});

    if (process.env.DEFAULT_GUILD) {
        client.bulkEditGuildCommands(process.env.DEFAULT_GUILD, arrayOfSlashCommands);
    } else {
        client.bulkEditCommands(arrayOfSlashCommands);
    }
	client.manager.init(client.user.id);

	// eslint-disable-next-line no-console
	console.log(`[Logged] ${client.user.username} in ${client.guilds.size} guilds`);
};
