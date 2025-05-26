const { SlashCommandBuilder } = require('discord.js');

// TODO: Put the documentation in another file

module.exports = {
	cooldown: 1,
	data: new SlashCommandBuilder()
		.setName('deltarune')
		.setDescription('Gets the number of days until Deltarune Chapters 3/4 release')
		.addBooleanOption(option =>
			option.setName('public')
				.setDescription('Whether or not to send the info in a public message')
				.setRequired(false)),

	async execute(interaction) {

		const day = 1000 * 60 * 60 * 24;
		const deltaruneRelease = new Date("2025-06-4");
		const today = new Date();

		const days = Math.round(Math.abs((today - deltaruneRelease) / day));
		let reply;

		if (days > 0) {
			reply = `DELTARUNE IN ${days} DAYS`;
		}
		else {
			reply = 'DELTARUNE IS OUT';
		}

		await interaction.reply({ content: reply.trim(), ephemeral: !interaction.options.getBoolean('public') });

	},
};