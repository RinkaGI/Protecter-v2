const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'ban',
    description: '¡Banea a un usuario!',
    cooldown: 1000,
    userPerms: ['BanMembers'],
    botPerms: ['BanMembers'],

    run: async(client, message, args) => {
        const user = message.mentions.members.first();
        const Reason = args.slice(1).join(' ') || 'Ninguna razón fue añadida'

        // const user = message.guild.members.cache.get(args.slice(0, 1).join(' '));

        const embedUser = new EmbedBuilder()
            .setTitle("> :x: Problema al banear :x:")
            .setDescription(`<:flecha:1027368636572237915> Necesitas añadir un usuario.`)
            .setColor(0x5A9EC9)
            .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
            .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
            .setTimestamp(new Date())
            .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (!Target) return message.channel.send({embeds: [embedUser]})

        const embed1 = new EmbedBuilder()
        .setTitle("> :x: Problema al banear :x:")
        .setDescription(`<:flecha:1027368636572237915> Al parecer, admin, no puedes banearte a ti mismo.`)
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (user.id === message.author.id){
        return message.channel.send({embeds: [embed1]})
        }

        const embed2 = new EmbedBuilder()
        .setTitle("> :x: Problema al banear :x:")
        .setDescription(`<:flecha:1027368636572237915>Al parecer, admin, no puedes banearme.`)
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")
    
        if (user.id == process.env.CLIENT_ID) {
            return message.channel.send({embeds: [embed2]})
        }

        const embed4 = new EmbedBuilder()
            .setTitle("> :x: Problema al banear :x:")
            .setDescription(`<:flecha:1027368636572237915> La razón no puede superar los 512 carácteres.`)
            .setColor(0x5A9EC9)
            .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
            .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
            .setTimestamp(new Date())
            .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (Reason.length >= 512){
            return message.channel.send({embeds: [embed4]})
        }

        const embed5 = new EmbedBuilder()
            .setTitle("> :white_check_mark: ¡Se ha baneado exitosamente!")
            .addFields(
                {
                    name: "<:flecha:1027368636572237915> Usuario",
                    value: `**Nombre:** ${String(user.user.username)} \n **Tag:** ${user.user.discriminator} \n **ID:** ${user.id}`,
                    inline: false
                },

                {
                    name: '<:flecha:1027368636572237915> Información del baneo',
                    value: `<:flecha:1027368636572237915> **Razón:** ${Reason} \n **Mensajes borrados desde los últimos:** 7 días.`,
                    inline: false
                }
            )
            .setColor(0x5A9EC9)
            .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
            .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
            .setTimestamp(new Date())
            .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")
            

        const embed6 = new EmbedBuilder()
            .setTitle("> :x: ¡Has sido baneado!")
            .setDescription(`¡Has sido baneado del servidor ${message.guild.name}!`)
            .addFields(
                {
                    name: "**Usuario**",
                    value: `<:flecha:1027368636572237915> **Nombre:** ${user.user.username} \n <:flecha:1027368636572237915> **Discriminador:** ${String(user.user.discriminator)} \n <:flecha:1027368636572237915> **ID:** ${user.id}`,
                    inline: true
                },

                {
                    name: '**Información del baneo:**',
                    value: `<:flecha:1027368636572237915> **Razón:** ${Reason} \n <:flecha:1027368636572237915> **Mensajes borrados desde los últimos:** 7 días.`,
                    inline: true
                }
            )
            .setColor(0x5A9EC9)
            .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
            .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
            .setTimestamp(new Date())
            .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        message.channel.send({embeds: [embed5]})

        user.send({embed: [embed6]}).catch(error => {console.log(error.stack)})

        user.ban({
            days: 7,
            reason: Reason
        })

    }

}