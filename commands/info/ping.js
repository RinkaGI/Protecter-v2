const { ApplicationCommandType } = require('discord.js');

module.exports = {
	name: 'ping',
	description: "Recibe el ping del bot!",
	cooldown: 3000,
	run: async (client, message, args) => {
		message.reply({ content: ` 🏓 Pong! Latencia: **${Math.round(client.ws.ping)} ms**` })
	}
};