const { ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField } = require('discord.js');
const db = require('../../database');

module.exports = {
    name: 'remove_warn',
    description: '¡Quita un warn de una persona!',
    cooldown: 1000,
    userPerms: ['BanMembers'],
    botPerms: ['BanMembers'],

    run: async (client, message, args) => {
        const Target = message.mentions.members.first();
        const Reason = args.slice(1).join(' ') || 'Ninguna razón fue añadida.';

        const embed1 = new EmbedBuilder()
            .setTitle("> :x: Problema al quitar el warn :x:")
            .setDescription(`<:flecha:1027368636572237915> Al parecer, admin, no puedes quitarte un warn a ti mismo.`)
            .setColor(0x5A9EC9)
            .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
            .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
            .setTimestamp(new Date())
            .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (Target.id == message.author.id) return message.reply({embeds: [embed1]})

        const embed2 = new EmbedBuilder()
        .setTitle("> :x: Problema al warnear :x:")
        .setDescription(`<:flecha:1027368636572237915> Al parecer, admin, no puedes quitarme un warn.`)
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")
    
        if (Target.id == process.env.CLIENT_ID) return message.reply({embeds: [embed2]})

        const embed3 = new EmbedBuilder()
        .setTitle("> :x: Problema al quitar el warn :x:")
        .setDescription(`<:flecha:1027368636572237915> ¡No se puede quitar el warn a un admin!`)
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (Target.permissions.has(PermissionsBitField.Flags.Administrator)) return message.reply({embeds: [embed3]})

        const embed4 = new EmbedBuilder()
        .setTitle("> :x: Problema al quitar el warn :x:")
        .setDescription(`<:flecha:1027368636572237915> La razón no puede superar los 512 carácteres.`)
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (Reason.length >= 512) return message.reply({embeds: [embed4]})

        const userWarns = await db.get(`warnings_${message.guild.id}_${Target.id}`)
    
        if (userWarns == undefined || userWarns == null || userWarns == NaN) {
            await db.set(`warnings_${message.guild.id}_${Target.id}`, 0)
        }
    
        if (db.get(`warnings_${message.guild.id}_${Target.id}`) == 0 || db.get(`warnings_${message.guild.id}_${Target.id}`) <= 0){
        message.reply(`:x: No puede ser menor que 0`)
        } else {
            await db.add(`warnings_${message.guild.id}_${Target.id}`, -1);
        }

        const embed5 = new EmbedBuilder()
        .setTitle("> :white_check_mark: ¡Se ha quitado el warn exitosamente!")
        .addFields(
            {
                name: "Usuario",
                value: `<:flecha:1027368636572237915> **Nombre:** ${String(Target.user.username)} \n <:flecha:1027368636572237915> **Tag:** ${Target.user.discriminator} \n <:flecha:1027368636572237915> **ID:** ${Target.id}`,
                inline: false
            },

            {
                name: 'Información del aviso del warn',
                value: `<:flecha:1027368636572237915> **Razón:** ${Reason} \n <:flecha:1027368636572237915> **Warns actuales:** ${await db.get(`warnings_${message.guild.id}_${Target.id}`)}`,
                inline: false
            }
        )
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        const embed6 = new EmbedBuilder()
        .setTitle("> :x: ¡Te han quitado un warn!")
        .setDescription(`<:flecha:1027368636572237915> ¡Te lo han quitado en el servidor ${message.guild.name}!`)
        .addFields(
            {
                name: "**Usuario**",
                value: `<:flecha:1027368636572237915> **Nombre:** ${Target.user.username} \n <:flecha:1027368636572237915> **Discriminador:** ${String(Target.user.discriminator)} \n <:flecha:1027368636572237915> **ID:** ${Target.user.id}`,
                inline: true
            },

            {
                name: '**Información:**',
                value: `<:flecha:1027368636572237915> **Razón:** ${Reason} \n <:flecha:1027368636572237915> **Warns actuales:** ${await db.get(`warnings_${message.guild.id}_${Target.id}`)}`,
                inline: true
            }
        )
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        const embed7 = new EmbedBuilder()
        .setTitle(`:x: Se ha quitado un warn de ${Target.user.username}`)
        .setDescription(`<:flecha:1027368636572237915>  El usuario ${Target.user.username} ha llegado a los 3 warns!`)
        .addFields(
            {
                name: "**Usuario**",
                value: `<:flecha:1027368636572237915> **Nombre:** ${Target.user.username} \n <:flecha:1027368636572237915> **Discriminador:** ${String(Target.user.discriminator)} \n <:flecha:1027368636572237915> **ID:** ${Target.user.id}`,
                inline: true
            },

            {
                name: '**Información:**',
                value: `<:flecha:1027368636572237915> **Razón:** Ha llegado a 3 warns \n <:flecha:1027368636572237915> **Razón del ultimo warn:** ${Reason}`,
                inline: true
            }
        )
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        Target.send({embed: [embed6]}).catch(error => {console.log(error.stack)})
        message.reply({embeds: [embed5]}).catch(error => {console.log(error.stack)});
    }
}