const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('catfact')
		.setDescription('Gives a random fact about cats'),
	async execute(interaction) {
		// Defer reply
		await interaction.deferReply({ ephemeral: true });
		// Get dog fact
		const resp = await fetch('https://catfact.ninja/fact');
		const data = await resp.json();
		const fact = data.fact;
		// console.log(JSON.stringify(fact, null, 2));
		// Send the reply
		await interaction.editReply(`Cool cat fact: ${fact}`);
	},
};