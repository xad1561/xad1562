const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

// TODO: Put the documentation in another file

module.exports = {
	cooldown: 1,
	data: new SlashCommandBuilder()
		.setName('randomsteamgame')
		.setDescription('Gets a random free Steam game from the top 50 highest rated of a specified tag.')
		.addStringOption(option =>
			option.setName('tag')
				.setDescription('The tag to use for filtering. Defaults to no specific tag if none is specified')
				.setRequired(false))
		.addBooleanOption(option =>
			option.setName('public')
				.setDescription('Whether or not to send the info in a public message')
				.setRequired(false)),

	async execute(interaction) {

		await interaction.deferReply({ ephemeral: !interaction.options.getBoolean('public') });

		let tag = interaction.options.getString('tag');
		let dataPath = `./data/steam_games/steam_${tag}.json`;
		let data, titles, r;

		if (tag == undefined) {
			dataPath = './data/steam_games/steam.json';
		}
		else {
			tag = tag.toLowerCase().trim().replace(/\s/g, '-').trim();
			dataPath = `./data/steam_games/steam_${tag}.json`;
		}

		if (fs.existsSync(dataPath)) {
			data = JSON.parse(fs.readFileSync(dataPath));
			titles = Object.keys(data);
			r = Math.floor(Math.random() * titles.length);
			await interaction.editReply(data[titles[r]]);
		}
		else {
			// dataPath = './data/steam_games/steam.json';
			// data = JSON.parse(fs.readFileSync(dataPath));
			// titles = Object.keys(data);
			// r = Math.floor(Math.random() * titles.length);
			// await interaction.editReply(data[titles[r]]);
			await interaction.editReply('Given tag not found (did you make a typo?)');
		}

	},
};