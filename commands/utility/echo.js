const { SlashCommandBuilder } = require('discord.js');

// TODO: Put the documentation in another file

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Says whatever you want')
		.addStringOption(option =>
			option.setName('text')
				.setDescription('The text to say')
				.setRequired(true))
		.addBooleanOption(option =>
			option.setName('public')
				.setDescription('Whether or not to send the info in a public message')
				.setRequired(false)),

	async execute(interaction) {
		const reply = interaction.options.getString('text');
		await interaction.reply({ content: reply.trim(), ephemeral: !interaction.options.getBoolean('public') });

	},
};