const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Responderá con tu ping!",
    type: 1,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSION: "SendMessages"
    },

    run: async(client, interaction, config, db) => {
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`Pong! ${client.ws.ping} ms! :ping_pong:`)
                    .setColor('Random')
            ]
        })
    }
}