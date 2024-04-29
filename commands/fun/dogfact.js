const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('dogfact')
		.setDescription('Gives a random fact about dogs')
		.addBooleanOption(option =>
			option.setName('public')
				.setDescription('Whether or not to send the info in a public message')
				.setRequired(false)),
	async execute(interaction) {
		// Defer reply
		await interaction.deferReply({ ephemeral: !interaction.options.getBoolean('public') });
		// Get dog fact
		const resp = await fetch('https://dogapi.dog/api/v2/facts');
		const data = await resp.json();
		const fact = data.data[0].attributes.body;
		// console.log(JSON.stringify(fact, null, 2));
		// Send the reply
		await interaction.editReply(`Cool dog fact: ${fact}`);
	},
};