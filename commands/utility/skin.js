const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	cooldown: 10,
	data: new SlashCommandBuilder()
		.setName('skin')
		.setDescription('Gets the Minecraft skin for a specified username')
		.addStringOption(option =>
			option.setName('username')
				.setDescription('The username for the skin you want to grab')
				.setRequired(true))
		.addBooleanOption(option =>
			option.setName('public')
				.setDescription('Whether or not to send the info in a public message')
				.setRequired(false)),
	async execute(interaction) {

		await interaction.deferReply({ ephemeral: !interaction.options.getBoolean('public') });

		// TODO: Make sure this doesn't shit itself when the API inevitably errors itself
		const username = interaction.options.getString('username');
		let resp = await fetch('https://api.mojang.com/users/profiles/minecraft/' + username);
		let data = await resp.json();

		if (data.id != undefined) {
			const uuid = data.id;
			resp = await fetch('https://sessionserver.mojang.com/session/minecraft/profile/' + uuid);
			data = await resp.json();
			const skin = JSON.parse(atob(data.properties[0].value));
			console.log(skin);
			await interaction.editReply(`Skin for ${username}: ${skin.textures['SKIN'].url}`);
		}
		else {
			await interaction.editReply('Username not found');
		}
	},
};