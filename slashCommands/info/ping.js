const { ApplicationCommandType } = require('discord.js');

module.exports = {
	name: 'ping',
	description: "Recibe el ping del bot!",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client, interaction) => {
		interaction.reply({ content: `🏓 Pong! Latencia: **${Math.round(client.ws.ping)} ms**` })
	}
};