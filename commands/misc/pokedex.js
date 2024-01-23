const { SlashCommandBuilder } = require('discord.js');
const { Dex } = require('pokemon-showdown');
const fs = require('fs');

// TODO: Add autocomplete to this
module.exports = {
	data: new SlashCommandBuilder()
		.setName('pokedex')
		.setDescription('Returns information about a Pokemon')
		.addStringOption(option =>
			option.setName('pokemon')
				.setDescription('The Pokemon to get info about')
				.setRequired(true)),

	async execute(interaction) {

		// Defer the reply in case it takes more than 3 seconds for some reason
		await interaction.deferReply({ ephemeral: true });
		let mon = Dex.species.get(interaction.options.getString('pokemon'));
		let reply = ``;
		// "Sometimes my genius is... it's almost frightening"
		const linkToSprite = `https://play.pokemonshowdown.com/sprites/gen5/${mon.name.toLowerCase()}.png`;

		if (mon.exists) {
			reply = `
			Name: ${mon.name}
			Types: ${mon.types.toString()}
			Base Stats:
				HP:  ${mon.baseStats.hp}
				ATK: ${mon.baseStats.atk}
				DEF: ${mon.baseStats.def}
				SPA: ${mon.baseStats.spa}
				SPD: ${mon.baseStats.spd}
				SPE: ${mon.baseStats.spe}
			`;
			// This is stupid and terrible but whatever
			if (Object.hasOwn(mon.abilities, '1') && Object.hasOwn(mon.abilities, 'H')) { reply += `\n Abilities: ${mon.abilities[0]}, ${mon.abilities[1]}, (${mon.abilities.H}) `; }
			else if (!Object.hasOwn(mon.abilities, '1') && Object.hasOwn(mon.abilities, 'H')) { reply += `\n Abilities: ${mon.abilities[0]}, (${mon.abilities.H}) `; }
			else { reply += `\n Abilities: ${mon.abilities[0]} `; }
			reply += `\n[Sprite](${linkToSprite})`
			await interaction.editReply(reply);
		}
		else {
			await interaction.editReply('The given Pokemon does not exist');
		}
	},
};