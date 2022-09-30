const { EmbedBuilder } = require("discord.js");

module.exports = {
    id: "myModal",
    run: async (client, interaction, config, db) => {

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription('Los modals funcionan! Esto es lo que has escrito: ' + interaction.fields.getTextInputValue('something'))
            ],
            ephemeral: true
        });

    },
};