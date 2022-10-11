const { ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'nuke',
    description: "¡Limpia TODOS los mensajes de este canal!",
    cooldown: 1000,
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'ManageMessages',

    options: [
        {
            name: 'razón', description: '¿Por qué quieres limpiar el canal?',
            type: ApplicationCommandOptionType.String, required: false
        }
    ],

    run: async (client, interaction) => {
        const Reason = interaction.options.get('razón') || 'Razón no añadida'

        const channelCloned = await interaction.channel.clone();

        if (channelCloned) {
            await interaction.channel.delete();
            
            const embed = new EmbedBuilder()
                .setTitle('> :white_check_mark: ¡Se ha limpiado el canal completamente!')
                .addFields(
                    {
                        name: 'Información de la limpieza',
                        description: `<:flecha:1027368636572237915> **Razón:** ${Reason}`
                    },

                    {
                        name: 'Información del responsable',
                        description: `<:flecha:1027368636572237915> **Usuario:** ${interaction.member.user.username} \n <:flecha:1027368636572237915> **Tag:** ${interaction.member.user.discriminator} \n <:flecha:1027368636572237915> **ID:** ${interaction.author.id}`
                    }
                )
                .setImage('https://media.tenor.com/etEKBbEGXRoAAAAd/cat-cleaning.gif')
                .setThumbnail('https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png')
                .setFooter('Protecter v2 | ¡Lo mejor para la seguridad de tu servidor!')
                .setTimestamp(new Date())

            interaction.reply({embeds: [embed]})
        }
    }
}