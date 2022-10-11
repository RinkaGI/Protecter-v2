const { ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField } = require('discord.js');
const db = require('../../database');

module.exports = {
    name: 'warns_edit',
    description: '¡Cambia el número de avisos de una persona! Si es mayor de 3 será baneado.',
    cooldown: 1000,
    default_member_permissions: 'BanMembers',

    options: [
        {
            name: 'usuario', description: '¿A quién quieres editar sus avisos?',
            type: ApplicationCommandOptionType.User, required: true
        },

        {
            name: 'cantidad', description: '¿A cuántos warns se los quieres cambiar?',
            type: ApplicationCommandOptionType.Integer, required: true
        },

        {
            name: 'razón', description: '¿Por qué se los cambias?',
            type: ApplicationCommandOptionType.String, required: false
        }
    ],

    run: async (client, interaction) => {
        const Target = interaction.options.getMember('usuario');
        const Reason = interaction.options.getString('razón') || 'Ninguna razón añadida'
        const Amount = interaction.options.getInteger('cantidad');

        const embed1 = new EmbedBuilder()
            .setTitle("> :x: Problema al editar los avisos :x:")
            .setDescription(`<:flecha:1027368636572237915> Al parecer, admin, no puedes cambiar tus propios avisos.`)
            .setColor(0x5A9EC9)
            .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
            .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
            .setTimestamp(new Date())
            .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (Target.id == interaction.member.id) return interaction.reply({embeds: [embed1]})

        const embed2 = new EmbedBuilder()
        .setTitle("> :x: Problema al cambiar los avisos :x:")
        .setDescription(`<:flecha:1027368636572237915> Al parecer, admin, no puedes cambiarme mis avisos.`)
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")
    
        if (Target.id == process.env.CLIENT_ID) return interaction.reply({embeds: [embed2]})

        const embed3 = new EmbedBuilder()
        .setTitle("> :x: Problema al cambiar los avisos :x:")
        .setDescription(`<:flecha:1027368636572237915> ¡No se puede cambiar los avisos de un admin!`)
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (Target.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({embeds: [embed3]})

        const embed4 = new EmbedBuilder()
        .setTitle("> :x: Problema al cambiar los avisos :x:")
        .setDescription(`<:flecha:1027368636572237915> La razón no puede superar los 512 carácteres.`)
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

    if (Reason.length >= 512) return interaction.reply({embeds: [embed4]})

    const userWarns = await db.get(`warnings_${interaction.guild.id}_${Target.id}`)

    if (userWarns == undefined || userWarns == null || userWarns == NaN) {
        await db.set(`warnings_${interaction.guild.id}_${Target.id}`, 0)
    }

    const embed5 = new EmbedBuilder()
        .setTitle("> :white_check_mark: ¡Se ha cambiado los avisos exitosamente!")
        .addFields(
            {
                name: "Usuario",
                value: `<:flecha:1027368636572237915> **Nombre:** ${String(Target.user.username)} \n <:flecha:1027368636572237915> **Tag:** ${Target.user.discriminator} \n <:flecha:1027368636572237915> **ID:** ${Target.id}`,
                inline: false
            },

            {
                name: 'Información del baneo',
                value: `<:flecha:1027368636572237915> **Razón:** ${Reason} \n <:flecha:1027368636572237915> **Warns actuales:** ${await db.get(`warnings_${interaction.guild.id}_${Target.id}`)}`,
                inline: false
            }
        )
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")
        

    const embed6 = new EmbedBuilder()
        .setTitle("> :x: ¡Te han cambiado los avisos!")
        .setDescription(`<:flecha:1027368636572237915> ¡Te han cambiado los avisos en el servidor ${interaction.guild.name}!`)
        .addFields(
            {
                name: "**Usuario**",
                value: `<:flecha:1027368636572237915> **Nombre:** ${Target.user.username} \n <:flecha:1027368636572237915> **Discriminador:** ${String(Target.user.discriminator)} \n <:flecha:1027368636572237915> **ID:** ${Target.user.id}`,
                inline: true
            },

            {
                name: '**Información del baneo:**',
                value: `<:flecha:1027368636572237915> **Razón:** ${Reason} \n <:flecha:1027368636572237915> **Warns actuales:** ${await db.get(`warnings_${interaction.guild.id}_${Target.id}`)}`,
                inline: true
            }
        )
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        const embed7 = new EmbedBuilder()
        .setTitle(`:x: Se ha baneado a ${Target.user.username}`)
        .setDescription(`<:flecha:1027368636572237915>  El usuario ${Target.user.username} ha llegado a los 3 warns!`)
        .addFields(
            {
                name: "**Usuario**",
                value: `<:flecha:1027368636572237915> **Nombre:** ${Target.user.username} \n <:flecha:1027368636572237915> **Discriminador:** ${String(Target.user.discriminator)} \n <:flecha:1027368636572237915> **ID:** ${Target.user.id}`,
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

        Target.send({embed: [embed6]}).catch(error => {console.log(error.stack)})

        await db.set(`warnings_${interaction.guild.id}_${Target.id}`, Amount);

        if (await db.get(`warnings_${interaction.guild.id}_${Target.id}`) >= 3) {
            interaction.reply({embeds: [embed7]})

            Target.ban({
                days: 7,
                reason: '3 warns.'
            })
        } else {
            interaction.reply({embeds: [embed5]})}
        
    }
}