const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
    name: 'clear',
    description: '¡Limpia los mensajes de ese canal!',
    cooldown: 1000,
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'ManageMessages',

    options: [
        {
            name: 'mensajes',
            description: '¿Cuántos mensajes quieres borrar?',
            type: ApplicationCommandOptionType.Integer,
            required: false
        },

        {
            name: 'usuario',
            description: '¿Quieres limpiar los mensajes de alguien en concreto?',
            type: ApplicationCommandOptionType.User,
            required: false
        },

        {
            name: 'razon',
            description: '¿Por qué quieres limpiar sus mensajes?',
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],

    run: async (client, interaction) => {
        const MessagesDelete = interaction.options.getInteger("mensajes");
        const Target = interaction.options.getMember("usuario");
        const Reason = interaction.options.getString("razon") || "No hay razón añadida."

        const Messages = await interaction.channel.messages.fetch({
            limit: MessagesDelete+1
        })

        const embed1 = new EmbedBuilder()
            .setTitle(':x: Problema al limpiar el canal :x:')
            .setDescription("Tu petición de mensajes ha superado el 99, ese número no es compatible con Discord.")
            .setColor(0x5A9EC9)
            .addFields(
                {
                    name: 'Sugerencia para arreglar',
                    value: '>> Usar un número menor \n `mensajes: 90`'
                }
            )
            .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
            .setFooter({text: "Protecter v2 | Lo mejor para la seguridad de tu servidor."})
            .setTimestamp(new Date())
            .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

            const embed3 = new EmbedBuilder()
            .setTitle(`:shield: Se ha limpiado todos los mensajes!`)
            .setColor(0x5A9EC9)
            .addFields(
                {
                    name: 'Información de la limpieza:',
                    value: `**Razón:** ${Reason}`
                }
            )
            .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
            .setFooter({text: "Protecter v2 | Lo mejor para la seguridad de tu servidor."})
            .setTimestamp(new Date())
            .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")
            
        
        if (MessagesDelete >= 100) return interaction.reply({embeds: [embed1]});
        if (MessagesDelete == 0) return MessagesDelete = 98;

        if (Target) {
            const TargetMessages = (await Messages).filter((m) => m.author.id === Target.id);

            const embed2 = new EmbedBuilder()
                .setTitle(`:shield: Se ha limpiado los mensajes de: ${String(Target.user.username)}`)
                .setColor(0x5A9EC9)
                .addFields(
                    {
                        name: 'Información de la limpieza:',
                        value: `**Usuario:** ${Target.user.username} \n **Tag:** ${Target.user.discriminator} \n **ID:** ${Target.id} \n **Razón:** ${Reason}`
                    }
                )
                .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
                .setFooter({text: "Protecter v2 | Lo mejor para la seguridad de tu servidor."})
                .setTimestamp(new Date())
                .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

            await interaction.channel.bulkDelete(TargetMessages, true).then(messages => {
                interaction.reply({embeds: [embed2]});
            })
        } else {
            await interaction.channel.bulkDelete(MessagesDelete, true).then(messages => {
                interaction.reply({embeds: [embed3]});
            })
        }
    }
}