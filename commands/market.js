const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const knex = require('knex')(require('../knexfile').production);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('market').setDescription('Market Information')
		.addSubcommand(subcommand => subcommand.setName('get').setDescription('Get the price of an item')
			.addStringOption(option => option.setName('name').setDescription('The name of the item').setRequired(true)))
		.addSubcommand(subcommand => subcommand.setName('stones').setDescription('Get prices of stones')),
	async execute(interaction) {
		let method = interaction.options.getSubcommand();
		let name = interaction.options.getString('name');

		let failEmbed = new MessageEmbed()
			.setColor('RED')
			.setDescription('Something went wrong when querying the database, please try again')

		let nameEmbed = new MessageEmbed()
			.setColor('ORANGE')
			.setDescription('There is no such item with the name you specified')

		if(method === 'stones') {
			await knex('items').where('name', 'destruction stone crystal').first().then(async function (row) {
				let name = row.name.toString();
				let lowestPrice = row['lowestPrice'].toString();
				let averagePrice = row['averagePrice'].toString();
				let cheapestRemaining = row['cheapestRemaining'].toString();
				let updatedAt = Date.parse(row['updatedAt'].toString());
				let image = row['image'].toString();

				let arr = name.split(" ");

				for (let i = 0; i < arr.length; i++) {
					arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
				}

				name = arr.join(" ");

				let array = [];

				array.push({name: 'Lowest Price', value: `\`${lowestPrice}\``, inline: true})
				array.push({name: 'Cheapest Remaining', value: `\`${cheapestRemaining}\``, inline: true})
				array.push({name: 'Average Price', value: `\`${averagePrice}\``, inline: true})

				let embed1 = new MessageEmbed()
					.setColor('GOLD')
					.setTitle(name)
					.setDescription(`Updated: <t:${Math.trunc(updatedAt / 1000)}:R>`)
					.setFields(array)
					.setThumbnail(image)

				await knex('items').where('name', 'guardian stone crystal').first().then(async function (row) {
					let name = row.name.toString();
					let lowestPrice = row['lowestPrice'].toString();
					let averagePrice = row['averagePrice'].toString();
					let cheapestRemaining = row['cheapestRemaining'].toString();
					let updatedAt = Date.parse(row['updatedAt'].toString());
					let image = row['image'].toString();

					let arr = name.split(" ");

					for (let i = 0; i < arr.length; i++) {
						arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
					}

					name = arr.join(" ");

					let array = [];

					array.push({name: 'Lowest Price', value: `\`${lowestPrice}\``, inline: true})
					array.push({name: 'Cheapest Remaining', value: `\`${cheapestRemaining}\``, inline: true})
					array.push({name: 'Average Price', value: `\`${averagePrice}\``, inline: true})

					let embed2 = new MessageEmbed()
						.setColor('GOLD')
						.setTitle(name)
						.setDescription(`Updated: <t:${Math.trunc(updatedAt / 1000)}:R>`)
						.setFields(array)
						.setThumbnail(image)

					await knex('items').where('name', 'great honor leapstone').first().then(async function (row) {
						let name = row.name.toString();
						let lowestPrice = row['lowestPrice'].toString();
						let averagePrice = row['averagePrice'].toString();
						let cheapestRemaining = row['cheapestRemaining'].toString();
						let updatedAt = Date.parse(row['updatedAt'].toString());
						let image = row['image'].toString();

						let arr = name.split(" ");

						for (let i = 0; i < arr.length; i++) {
							arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
						}

						name = arr.join(" ");

						let array = [];

						array.push({name: 'Lowest Price', value: `\`${lowestPrice}\``, inline: true})
						array.push({name: 'Cheapest Remaining', value: `\`${cheapestRemaining}\``, inline: true})
						array.push({name: 'Average Price', value: `\`${averagePrice}\``, inline: true})

						let embed3 = new MessageEmbed()
						.setColor('GOLD')
						.setTitle(name)
						.setDescription(`Updated: <t:${Math.trunc(updatedAt / 1000)}:R>`)
						.setFields(array)
						.setThumbnail(image)
						interaction.reply({embeds: [embed1, embed2, embed3]});
					})
				})
			}).catch((err) => {
				console.error(err)
				interaction.reply({embeds: [failEmbed]});
			})
		}

		if(method === 'get') {
			await knex('items').where('name', name.toLowerCase()).first().then(async function(row) {
				if(!row) {
					await interaction.reply({embeds: [nameEmbed]});
					return false;
				}
				let name = row.name.toString();
				let lowestPrice = row['lowestPrice'].toString();
				let averagePrice = row['averagePrice'].toString();
				let cheapestRemaining = row['cheapestRemaining'].toString();
				let updatedAt = Date.parse(row['updatedAt'].toString());
				let image = row['image'].toString();

				let arr = name.split(" ");

				for (let i = 0; i < arr.length; i++) {
					arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
				}

				name = arr.join(" ");

				let array = [];

				array.push({name: 'Lowest Price', value: `\`${lowestPrice}\``, inline: true})
				array.push({name: 'Cheapest Remaining', value: `\`${cheapestRemaining}\``, inline: true})
				array.push({name: 'Average Price', value: `\`${averagePrice}\``, inline: true})

				let embed = new MessageEmbed()
					.setColor('GOLD')
					.setTitle(name)
					.setDescription(`Updated: <t:${Math.trunc(updatedAt / 1000)}:R>`)
					.setFields(array)
					.setThumbnail(image)
				interaction.reply({embeds: [embed]});
			}).catch((err) => {
				console.error(err)
				interaction.reply({embeds: [failEmbed]});
			})
		}
	}
};
