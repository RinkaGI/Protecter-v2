const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kickea a una persona!',
    cooldown: 1000,
    userPerms: ["BanMembers"],
    botPerms: ["BanMembers"],

    run: async (client, message, args) => {
        const Target = message.mentions.members.first()
        const Reason = args.slice(1).join(' ')

        const embedUser = new EmbedBuilder()
        .setTitle("> :x: Problema al kickear :x:")
        .setDescription(`<:flecha:1027368636572237915> Necesitas añadir un usuario.`)
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (!Target) return message.channel.send({embeds: [embedUser]})

        const embed1 = new EmbedBuilder()
        .setTitle("> :x: Problema al kickear :x:")
        .setDescription(`<:flecha:1027368636572237915> Al parecer, admin, no puedes kickearte a ti mismo.`)
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (Target.id === message.author.id){
            return interaction.reply({embeds: [
                embed1
            ]})
        }

        const embed2 = new EmbedBuilder()
            .setTitle("> :x: Problema al kickear :x:")
            .setDescription(`<:flecha:1027368636572237915> Al parecer, admin, no puedes kickearme.`)
            .setColor(0x5A9EC9)
            .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
            .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
            .setTimestamp(new Date())
            .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")
        
        if (Target.id == process.env.CLIENT_ID){
            return message.channel.send({embeds: [embed2]})
        }

        const embed3 = new EmbedBuilder()
            .setTitle("> :x: Problema al kickear :x:")
            .setDescription(`<:flecha:1027368636572237915> ¡No se puede kickear a un admin!`)
            .setColor(0x5A9EC9)
            .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
            .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
            .setTimestamp(new Date())
            .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (Target.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.channel.send({embeds: [embed3]})
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
            .setTitle("> :white_check_mark: ¡Se ha kickeado exitosamente!")
            .addFields(
                {
                    name: "<:flecha:1027368636572237915> Usuario",
                    value: `**Nombre:** ${String(Target.user.username)} \n **Tag:** ${Target.user.discriminator} \n **ID:** ${Target.id}`,
                    inline: false
                },

                {
                    name: '<:flecha:1027368636572237915> Información del kickeo',
                    value: `**Razón:** ${Reason}`,
                    inline: false
                }
            )
            .setColor(0x5A9EC9)
            .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
            .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
            .setTimestamp(new Date())
            .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

            const embed6 = new EmbedBuilder()
                .setTitle("> :x: ¡Has sido kickeado!")
                .setDescription(`¡Has sido kickeado del servidor ${message.guild.name}!`)
                .addFields(
                    {
                        name: "**Usuario**",
                        value: `<:flecha:1027368636572237915> **Nombre:** ${Target.user.username} \n <:flecha:1027368636572237915> **Discriminador:** ${String(Target.user.discriminator)} \n <:flecha:1027368636572237915> **ID:** ${Target.user.id}`,
                        inline: true
                    },

                    {
                        name: '**Información del kickeo:**',
                        value: `<:flecha:1027368636572237915> **Razón:** ${Reason}`,
                        inline: true
                    }
                )
                .setColor(0x5A9EC9)
                .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
                .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
                .setTimestamp(new Date())
                .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

                Target.send({embed: [embed6]}).catch(error => {console.log(error.stack)})

                Target.kick({
                    reason: Reason
                })
                
                message.channel.send({embeds: [embed5]})
    }
}