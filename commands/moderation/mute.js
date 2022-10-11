const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField} = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'mute',
    description: 'Mutea a una persona!',
    cooldown: 1000,
    userMembers: ["MuteMembers"],
    botPerms: ["MuteMembers"],

    run: async (client, message, args) =>  {
        const Target = message.mentions.members.first();
        const Time = args[1] || '15m'
        const Reason = args.slice(2).join(' ') || 'Ninguna razón fue añadida.'

        const embedUser = new EmbedBuilder()
        .setTitle("> :x: Problema al mutear :x:")
        .setDescription(`<:flecha:1027368636572237915> Necesitas añadir un usuario.`)
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

            if (!Target) return message.channel.send({embeds: [embedUser]})

        const embed1 = new EmbedBuilder()
        .setTitle("> :x: Problema al mutear :x:")
        .setDescription(`<:flecha:1027368636572237915> Al parecer, admin, no te puedes mutear a ti mismo.`)
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (Target.id === message.author.id){
            return message.reply({embeds: [
                embed1
            ]})
        }

        const embed2 = new EmbedBuilder()
        .setTitle("> :x: Problema al mutear :x:")
        .setDescription(`<:flecha:1027368636572237915> Al parecer, admin, no puedes mutearme.`)
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")
    
        if (Target.id == process.env.CLIENT_ID){
            return message.reply({embeds: [embed2]})
        }

        const embed3 = new EmbedBuilder()
        .setTitle("> :x: Problema al mutear :x:")
        .setDescription(`<:flecha:1027368636572237915> ¡No se puede mutear a un admin!`)
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (Target.permissions.has(PermissionsBitField.Flags.Administrator)){
            return message.reply({embeds: [embed3]})
        }

        const embed4 = new EmbedBuilder()
        .setTitle("> :x: Problema al mutear :x:")
        .setDescription(`<:flecha:1027368636572237915> La razón no puede superar los 512 carácteres.`)
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (Reason.length >= 512){
            return message.reply({embeds: [embed4]})
        }

        const embed5 = new EmbedBuilder()
        .setTitle("> :white_check_mark: ¡Se ha muteado exitosamente!")
        .addFields(
            {
                name: "Usuario",
                value: `<:flecha:1027368636572237915> **Nombre:** ${String(Target.user.username)} \n <:flecha:1027368636572237915> **Tag:** ${Target.user.discriminator} \n <:flecha:1027368636572237915> **ID:** ${Target.id}`,
                inline: false
            },

            {
                name: 'Información del muteo',
                value: `<:flecha:1027368636572237915> **Razón:** ${Reason} \n <:flecha:1027368636572237915> **Tiempo:** ${Time} minutos.`,
                inline: false
            }
        )
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        const embed6 = new EmbedBuilder()
        .setTitle("> :x: ¡Has sido muteado!")
        .setDescription(`<:flecha:1027368636572237915> ¡Has sido muteado del servidor ${message.guild.name}!`)
        .addFields(
            {
                name: "**Usuario**",
                value: `<:flecha:1027368636572237915> **Nombre:** ${Target.user.username} \n <:flecha:1027368636572237915> **Discriminador:** ${String(Target.user.discriminator)} \n <:flecha:1027368636572237915> **ID:** ${Target.user.id}`,
                inline: true
            },

            {
                name: '**Información del muteo:**',
                value: `<:flecha:1027368636572237915> **Razón:** ${Reason} \n <:flecha:1027368636572237915> **Tiempo:** ${Time} minutos.`,
                inline: true
            }
        )
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        Target.send({embed: [embed6]}).catch(error => {console.log(error.stack)})


        await Target.timeout(ms(Time), Reason)
        
        message.reply({embeds: [embed5]})
    }
}