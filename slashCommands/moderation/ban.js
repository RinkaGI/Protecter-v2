const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
    name: 'ban',
    description: "¡Banea a un usuario!",
    cooldown: 1000,
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'BanMembers',

    options: [
        {
            name: "usuario" , description: "Usuario a banear.",
            type: ApplicationCommandOptionType.User, required: true
        },

        {
            name: "razon", description: "¿Por qué le vas a banear?",
            type: ApplicationCommandOptionType.String, required: true
        },

        {
            name: "mensajes", description: "¿Cuantos mensajes suyos quieres borrar?",
            type: ApplicationCommandOptionType.String, required: true,
            
            choices: [
                {
                    name: 'Ninguno.',
                    value: "0"
                },

                {
                    name: "Una semana",
                    value: "7"
                },

                {
                    name: "Un mes.",
                    value: "30"
                }
            ]
        }
    ],

    run: async(client, interaction) => {
        const Target = interaction.options.getMember("usuario");
        const Reason = interaction.options.getString("razon");
        const AmountStr = interaction.options.getString("mensajes");

        const embed1 = new EmbedBuilder()
            .setTitle("> :x: Problema al banear :x:")
            .setDescription(`<:flecha:1027368636572237915> Al parecer, admin, no puedes banearte a ti mismo.`)
            .setColor(0x5A9EC9)
            .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
            .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
            .setTimestamp(new Date())
            .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (Target.id === interaction.member.id)
        return interaction.reply({embeds: [
            embed1
        ]})


        const embed2 = new EmbedBuilder()
            .setTitle("> :x: Problema al banear :x:")
            .setDescription(`<:flecha:1027368636572237915> Al parecer, admin, no puedes banearme.`)
            .setColor(0x5A9EC9)
            .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
            .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
            .setTimestamp(new Date())
            .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")
        
        if (Target.id == process.env.CLIENT_ID)
            return interaction.reply({embeds: [embed2]})


        const embed3 = new EmbedBuilder()
            .setTitle("> :x: Problema al banear :x:")
            .setDescription(`<:flecha:1027368636572237915> ¡No se puede banear a un admin!`)
            .setColor(0x5A9EC9)
            .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
            .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
            .setTimestamp(new Date())
            .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (Target.permissions.has(PermissionsBitField.Flags.Administrator)) 
            return interaction.reply({embeds: [embed3]})


        const embed4 = new EmbedBuilder()
            .setTitle("> :x: Problema al banear :x:")
            .setDescription(`<:flecha:1027368636572237915> La razón no puede superar los 512 carácteres.`)
            .setColor(0x5A9EC9)
            .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
            .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
            .setTimestamp(new Date())
            .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (Reason.length >= 512)
            return interaction.reply({embeds: [embed4]})

        const embed5 = new EmbedBuilder()
            .setTitle("> :white_check_mark: ¡Se ha baneado exitosamente!")
            .addFields(
                {
                    name: "Usuario",
                    value: `<:flecha:1027368636572237915> **Nombre:** ${String(Target.user.username)} \n <:flecha:1027368636572237915> **Tag:** ${Target.user.discriminator} \n <:flecha:1027368636572237915> **ID:** ${Target.id}`,
                    inline: false
                },

                {
                    name: 'Información del baneo',
                    value: `<:flecha:1027368636572237915> **Razón:** ${Reason} \n <:flecha:1027368636572237915> **Mensajes borrados desde los últimos:** ${AmountStr} días.`,
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
            .setDescription(`<:flecha:1027368636572237915> ¡Has sido baneado del servidor ${interaction.guild.name}!`)
            .addFields(
                {
                    name: "**Usuario**",
                    value: `<:flecha:1027368636572237915> **Nombre:** ${Target.user.username} \n <:flecha:1027368636572237915> **Discriminador:** ${String(Target.user.discriminator)} \n <:flecha:1027368636572237915> **ID:** ${Target.user.id}`,
                    inline: true
                },

                {
                    name: '**Información del baneo:**',
                    value: `<:flecha:1027368636572237915> **Razón:** ${Reason} \n <:flecha:1027368636572237915> **Mensajes borrados desde los últimos:** ${AmountStr} días.`,
                    inline: true
                }
            )
            .setColor(0x5A9EC9)
            .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
            .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
            .setTimestamp(new Date())
            .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        Target.send({embed: [embed6]}).catch(error => {console.log(error.stack)})

        Target.ban({
            days: AmountStr,
            reason: Reason
        })
        
        interaction.reply({embeds: [embed5]})


    }
}