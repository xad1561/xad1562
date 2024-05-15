const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 1,
	data: new SlashCommandBuilder()
		.setName('tip')
		.setDescription('Gets a random loading screen tip')
		.addBooleanOption(option =>
			option.setName('public')
				.setDescription('Whether or not to send the info in a public message')
				.setRequired(false)),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: !interaction.options.getBoolean('public') });
		const tips = [
			'Blaze cakes are very tasty',
			'Nothing happened in Tiananmen Square in 1989',
			'I peed my pants',
			'The Star Wars sequel trilogy does not exist',
			'On 4/8/2029, I will launch a military invasion of Honduras using a hired mercenary army',
			'Beware of the trees when they begin to speak Vietnamese',
			'Poland'];
		const reply = tips[Math.floor(Math.random() * tips.length)];
		console.log(reply);
		await interaction.editReply(reply);

	},
};