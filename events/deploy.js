const { BOT_TOKEN, GUILD_ID, CLIENT_ID } = require('../config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

module.exports = {
	name: 'ready',
	once: true,
	async execute() {
		const commands = [];
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const command = require(`../commands/${file}`);
			commands.push(command.data.toJSON());
		}
		const rest = new REST({ version: '9' }).setToken(BOT_TOKEN);

		await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commands});
	}
}
