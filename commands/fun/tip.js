const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 1,
	data: new SlashCommandBuilder()
		.setName('tip')
		.setDescription('Gets a "useful" loading screen tip')
		.addIntegerOption(option =>
			option.setName('number')
				.setDescription('The number of the tip you want to get. Leave blank for a random tip.')
				.setRequired(false))
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
			'Beware of the trees, for soon they will speak Vietnamese',
			'Send xad1561 Hatsune Miku related stuff to torment him for me',
			"Someone you don't like is annoying you? Just shoot them with field artillery!",
			'Poland',
			"Flerovium is a synthetic chemical element; it has symbol Fl and atomic number 114. It is an extremely radioactive, superheavy element, named after the Flerov Laboratory of Nuclear Reactions of the Joint Institute for Nuclear Research in Dubna, Russia, where the element was discovered in 1999.",
			'An intercontinental ballistic missile (ICBM) is a ballistic missile with a range greater than 5,500 kilometres (3,400 mi),[1] primarily designed for nuclear weapons delivery (delivering one or more thermonuclear warheads). Conventional, chemical, and biological weapons can also be delivered with varying effectiveness, but have never been deployed on ICBMs. Most modern designs support multiple independently targetable reentry vehicle (MIRVs), allowing a single missile to carry several warheads, each of which can strike a different target. The United States, Russia, China, France, India, the United Kingdom, Israel, and North Korea are the only countries known to have operational ICBMs. Pakistan is the only nuclear-armed state that does not possess ICBMs. ',
			'Genshin Impact is cringe',
		];

		const number = interaction.options.getInteger('number');

		if (number > 0 && number <= tips.length) {
			const reply = tips[number - 1];
			console.log(`${number}. ${reply}`);
			await interaction.editReply(`Tip #${number}: ${reply}`);
		}
		else if (number == undefined) {
			const index = Math.floor(Math.random() * tips.length);
			const reply = tips[index];
			console.log(`${index + 1}. ${reply}`);
			await interaction.editReply(`Tip #${index}: ${reply}`);
		}
		else {
			await interaction.editReply('Tip number is too large or less than 1.');
		}
	},
};