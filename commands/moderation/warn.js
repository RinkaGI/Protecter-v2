const { ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField } = require('discord.js');
const db = require('../../database');

module.exports = {
    name: 'warn',
    description: '¡Avisa a una persona! En caso de que este sea el tercer aviso será baneado.',
    cooldown: 1000,
    userPerms: ['BanMembers'],
    botPerms: ['BanMembers'],

    run: async (client, message, args) => {
        const user = message.mentions.members.first();
        const Reason = args.slice(1).join(' ') || 'Ninguna razón fue añadida'

        const embed1 = new EmbedBuilder()
            .setTitle("> :x: Problema al warnear :x:")
            .setDescription(`<:flecha:1027368636572237915> Al parecer, admin, no puedes warnearte a ti mismo.`)
            .setColor(0x5A9EC9)
            .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
            .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
            .setTimestamp(new Date())
            .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (user.id == message.author.id) return message.reply({embeds: [embed1]})

        const embed2 = new EmbedBuilder()
        .setTitle("> :x: Problema al warnear :x:")
        .setDescription(`<:flecha:1027368636572237915> Al parecer, admin, no puedes warnearme.`)
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")
    
        if (user.id == process.env.CLIENT_ID) return message.reply({embeds: [embed2]})

        const embed3 = new EmbedBuilder()
        .setTitle("> :x: Problema al warnear :x:")
        .setDescription(`<:flecha:1027368636572237915> ¡No se puede warnear a un admin!`)
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (user.permissions.has(PermissionsBitField.Flags.Administrator)) return message.reply({embeds: [embed3]})

        const embed4 = new EmbedBuilder()
        .setTitle("> :x: Problema al warnear :x:")
        .setDescription(`<:flecha:1027368636572237915> La razón no puede superar los 512 carácteres.`)
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

    if (Reason.length >= 512) return message.reply({embeds: [embed4]})

    const userWarns = await db.get(`warnings_${message.guild.id}_${user.id}`)

    if (userWarns == undefined || userWarns == null || userWarns == NaN) {
        await db.set(`warnings_${interaction.guild.id}_${user.id}`, 0)
    }

    const embed5 = new EmbedBuilder()
        .setTitle("> :white_check_mark: ¡Se ha warneado exitosamente!")
        .addFields(
            {
                name: "Usuario",
                value: `<:flecha:1027368636572237915> **Nombre:** ${String(user.user.username)} \n <:flecha:1027368636572237915> **Tag:** ${user.user.discriminator} \n <:flecha:1027368636572237915> **ID:** ${user.id}`,
                inline: false
            },

            {
                name: 'Información del baneo',
                value: `<:flecha:1027368636572237915> **Razón:** ${Reason} \n <:flecha:1027368636572237915> **Warns actuales:** ${await db.get(`warnings_${message.guild.id}_${user.id}`)}`,
                inline: false
            }
        )
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")
        

    const embed6 = new EmbedBuilder()
        .setTitle("> :x: ¡Has sido warneado!")
        .setDescription(`<:flecha:1027368636572237915> ¡Has sido warneado en el servidor ${message.guild.name}!`)
        .addFields(
            {
                name: "**Usuario**",
                value: `<:flecha:1027368636572237915> **Nombre:** ${user.user.username} \n <:flecha:1027368636572237915> **Discriminador:** ${String(user.user.discriminator)} \n <:flecha:1027368636572237915> **ID:** ${user.user.id}`,
                inline: true
            },

            {
                name: '**Información del baneo:**',
                value: `<:flecha:1027368636572237915> **Razón:** ${Reason} \n <:flecha:1027368636572237915> **Warns actuales:** ${await db.get(`warnings_${message.guild.id}_${user.id}`)}`,
                inline: true
            }
        )
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        const embed7 = new EmbedBuilder()
        .setTitle(`:x: Se ha baneado a ${user.user.username}`)
        .setDescription(`<:flecha:1027368636572237915>  El usuario ${user.user.username} ha llegado a los 3 warns!`)
        .addFields(
            {
                name: "**Usuario**",
                value: `<:flecha:1027368636572237915> **Nombre:** ${user.user.username} \n <:flecha:1027368636572237915> **Discriminador:** ${String(user.user.discriminator)} \n <:flecha:1027368636572237915> **ID:** ${user.user.id}`,
                inline: true
            },

            {
                name: '**Información del baneo:**',
                value: `<:flecha:1027368636572237915> **Razón:** Ha llegado a 3 warns \n <:flecha:1027368636572237915> **Razón del ultimo warn:** ${Reason}`,
                inline: true
            }
        )
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        user.send({embed: [embed6]}).catch(error => {console.log(error.stack)})

        await db.add(`warnings_${message.guild.id}_${user.id}`, 1);

        if (await db.get(`warnings_${message.guild.id}_${user.id}`) >= 3) {
            message.reply({embeds: [embed7]})

            user.ban({
                days: 7,
                reason: '3 warns.'
            })
        }

        message.reply({embeds: [embed5]})
        
    }
}