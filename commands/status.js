const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const knex = require('knex')(require('../knexfile').production);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Change bot status')
		.addStringOption(o => o.setName('text').setDescription('Message to display in bot status').setRequired(true)),
	async execute(interaction) {
		let text = interaction.options.getString('text');
		let client = interaction.client;

		if(text.length > 128) {
			let embed = new MessageEmbed()
				.setColor('RED')
				.setDescription("Status can't be longer than 128 characters")
			await interaction.reply({embeds: [embed]});
			return false;
		}

		await client.user.setPresence({ activities: [{ name: text, type: 'WATCHING' }], status: 'online' });

		let embed = new MessageEmbed()
			.setColor('GREEN')
			.setDescription('Status changed')
		await interaction.reply({embeds: [embed]});
	}
};
