const { SlashCommandBuilder } = require('discord.js');
const { Dex } = require('pokemon-showdown');
// const fs = require('fs');

// TODO: Add autocomplete to this
module.exports = {
	data: new SlashCommandBuilder()
		.setName('pokedex')
		.setDescription('Returns information about a Pokemon')
		.addStringOption(option =>
			option.setName('pokemon')
				.setDescription('The Pokemon to get info about')
				.setRequired(true))
		.addBooleanOption(option =>
			option.setName('public')
				.setDescription('Whether or not to send the info in a public message')
				.setRequired(false)),

	async execute(interaction) {

		// Defer the reply in case it takes more than 3 seconds for some reason
		await interaction.deferReply({ ephemeral: !interaction.options.getBoolean('public') });
		const mon = Dex.species.get(interaction.options.getString('pokemon'));
		// Declare the variables
		let reply = '';
		let abilities = '';
		// "Sometimes my genius is... it's almost frightening"
		const linkToSprite = `https://play.pokemonshowdown.com/sprites/gen5/${mon.name.toLowerCase()}.png`;
		// const linkToShinySprite = `https://play.pokemonshowdown.com/sprites/gen5-shiny/${mon.name.toLowerCase()}.png`;

		// Check if the Pokemon actually exists
		if (mon.exists) {

			// Get the abilities for the Pokemon in question, hopefully Game Freak doensn't introduce Pokemon having 4 abilities
			if (Object.hasOwn(mon.abilities, '1') && Object.hasOwn(mon.abilities, 'H')) { abilities = `Abilities: ${mon.abilities[0]}, ${mon.abilities[1]}, (${mon.abilities.H}) `; }
			else if (!Object.hasOwn(mon.abilities, '1') && Object.hasOwn(mon.abilities, 'H')) { abilities = `Abilities: ${mon.abilities[0]}, (${mon.abilities.H}) `; }
			else { abilities = `Abilities: ${mon.abilities[0]} `; }

			// Really bad template string
			reply = `
			Name: ${mon.name}
			Number: ${mon.num}
			Types: ${mon.types.toString()}
			Base Stats:
				HP:    ${mon.baseStats.hp}
				ATK:   ${mon.baseStats.atk}
				DEF:   ${mon.baseStats.def}
				SPA:   ${mon.baseStats.spa}
				SPD:   ${mon.baseStats.spd}
				SPE:   ${mon.baseStats.spe}
				TOTAL: ${mon.baseStats.hp + mon.baseStats.atk + mon.baseStats.def + mon.baseStats.spa + mon.baseStats.spd + mon.baseStats.spe}
			${abilities}
			Egg Groups: ${mon.eggGroups.toString()}
			Color : ${mon.color}
			Height: ${mon.heightm}m
			Weight: ${mon.weightkg}kg `;
			// mon.forme always exists even if it doesn't have a value so I have to trim it and check if its empty instead to know when to add the forme to the reply string
			if (mon.forme.trim() != '') { reply += `\nForme: ${mon.forme}`; }
			// Add the link to sprite at the end
			reply += `\n[Sprite](${linkToSprite})`;
			// Send the reply
			await interaction.editReply(reply);
		}
		else {
			// Send error if user enters an invalid Pokemon
			await interaction.editReply('The given Pokemon does not exist (did you make a typo?)');
		}
	},
};