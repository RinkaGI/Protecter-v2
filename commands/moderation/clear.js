const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
    name: 'clear',
    description: '¡Limpia mensajes de ese canal!',
    cooldown: 1000,
    userPerms: ['ManageMessages'],
    botPerms: ['ManageMessages'],

    run: async (client, message, args) => {
        try {
            const user = message.mentions.members.first()
            const Amount = 99
            const Reason = args.slice(2).join(' ') || 'No hay ninguna razón añadida.'

            if (!Amount || isNaN(Amount)) return message.channel.send(`:x: ${Amount} no es un número válido!`)
    
            const Messages = await message.channel.messages.fetch({
                limit: Amount+1
            })
    
            const embed1 = new EmbedBuilder()
                .setTitle(':x: Problema al limpiar el canal :x:')
                .setDescription("<:flecha:1027368636572237915> Tu petición de mensajes ha superado el 99, ese número no es compatible con Discord.")
                .setColor(0x5A9EC9)
                .addFields(
                    {
                        name: 'Sugerencia para arreglar',
                        value: '<:flecha:1027368636572237915> Usar un número menor \n `mensajes: 90`'
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
                        value: `<:flecha:1027368636572237915> **Razón:** ${Reason}`
                    }
                )
                .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
                .setFooter({text: "Protecter v2 | Lo mejor para la seguridad de tu servidor."})
                .setTimestamp(new Date())
                .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")
                
            
            if (Amount){
                if (parseInt(Amount) >= 100) return message.channel.send({embeds: [embed1]});
                if (parseInt(Amount) == 0) return Amount = 98;
            }
    
            if (user) {
                const TargetMessages = (await Messages).filter((m) => m.author.id === user.id);
    
                const embed2 = new EmbedBuilder()
                    .setTitle(`:shield: Se ha limpiado los mensajes de: ${String(user.user.username)}`)
                    .setColor(0x5A9EC9)
                    .addFields(
                        {
                            name: 'Información de la limpieza:',
                                value: `<:flecha:1027368636572237915> **Usuario:** ${user.user.username} \n <:flecha:1027368636572237915> **Tag:** ${user.user.discriminator} \n <:flecha:1027368636572237915> **ID:** ${user.id} \n **Razón:** ${Reason}`
                        }
                    )
                    .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
                    .setFooter({text: "Protecter v2 | Lo mejor para la seguridad de tu servidor."})
                    .setTimestamp(new Date())
                    .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")
    
                await message.channel.bulkDelete(TargetMessages, true).then(messages => {
                    message.channel.send({embeds: [embed2]});
                })
            } else {
                await message.channel.bulkDelete(Amount, true).then(messages => {
                    message.channel.send({embeds: [embed3]});
                })      
            }
        } catch (err) {
            console.log(err.stack)
        }
    }
}