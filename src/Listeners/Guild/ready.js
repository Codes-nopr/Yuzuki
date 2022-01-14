/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-tabs */
const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

module.exports = async (client, interaction) => {
	client.editStatus("online", { name: "with music" }, 0);
	client.manager.init(client.user.id);

	// eslint-disable-next-line no-console
	console.log(`[Logged] ${client.user.username} in ${client.guilds.size} guilds`);
};
