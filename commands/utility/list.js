const { SlashCommandBuilder } = require('discord.js');

// TODO: Put the documentation in another file

module.exports = {
	cooldown: 1,
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('Lists commands added by xad1562'),

	async execute(interaction) {
		const reply = `
		List of commands:
		list: Show this menu
		dogfact: Show a random fact about dogs
		catfact: Show a random fact about cats
		pokedex: Returns information about a Pokemon
		tragedy: Replies with the tragedy of Darth Plagueis the wise
		`;
		await interaction.reply({ content: reply.trim(), ephemeral: true });

	},
};