// A lot of this code was modified from the discord.js guide https://discordjs.guide/
// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits, IntentsBitField } = require('discord.js');
const { token, logging } = require('./config.json');
const fs = require('fs');
const path = require('path');

// Create a new client instance
const intents = new IntentsBitField();
intents.add([GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages]);
const client = new Client({ intents: intents });

// Create collections
client.commands = new Collection();
client.cooldowns = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a "data" or "execute" property.`);
		}
	}
}

// When the client is ready, run this code (only once).
client.once(Events.ClientReady, readyClient => {
	console.log(`Logged in as ${readyClient.user.tag}`);
	if (!logging) {
		console.log('Logging is currently disabled');
	}
});

// Handle commands
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	if (logging) {
		console.log(interaction);
	}

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	const { cooldowns } = interaction.client;

	if (!cooldowns.has(command.data.name)) {
		cooldowns.set(command.data.name, new Collection());
	}

	// Handle cooldowns
	const now = Date.now();
	const timestamps = cooldowns.get(command.data.name);
	const defaultCooldownDuration = 2;
	const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1_000;

	if (timestamps.has(interaction.user.id)) {
		const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

		if (now < expirationTime) {
			const expiredTimestamp = Math.round(expirationTime / 1_000);
			return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
		}
	}

	timestamps.set(interaction.user.id, now);
	setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

	// Execute commands
	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

// Log in to Discord
client.login(token);
