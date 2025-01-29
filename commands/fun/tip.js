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
			'Nothing happened on June 4, 1989 in Tiananmen Square, Beijing, China',
			'I peed my pants',
			'The Star Wars sequel trilogy does not exist',
			'On 4/8/2029, I will launch an invasion of Honduras using a hired mercenary army',
			'Beware of the trees when they begin to speak Vietnamese',
			'Send xad1561 Hatsune Miku related stuff to torment him',
			'',
			'Poland'];
		const reply = tips[Math.floor(Math.random() * tips.length)];
		console.log(reply);
		await interaction.editReply(reply);

	},
};