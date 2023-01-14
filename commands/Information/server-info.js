const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'server-info',
    description: 'Get the server information.',
    type: 1,
    options: [],
    role_perms: null,
    developers_only: false,
    category: 'Information',
    run: async (client, interaction, config) => {

        const guild = interaction.guild;

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Server info: ' + guild.name)
                    .setThumbnail(guild.iconURL())
                    .addFields(
                        {
                            name: 'Guild ID',
                            value: `${guild.id}`,
                            inline: true
                        },
                        {
                            name: 'Server owner',
                            value: `${await guild.fetchOwner().then((u) => u.user.tag)}`,
                            inline: true
                        },
                        {
                            name: 'Guild ID',
                            value: `${guild.id}`,
                            inline: true
                        },
                        {
                            name: 'Total members',
                            value: `${guild.memberCount}`,
                            inline: true
                        },
                        {
                            name: 'Total channels',
                            value: `${guild.channels.cache.size}`,
                            inline: true
                        },
                        {
                            name: 'Total boosts',
                            value: `${guild.premiumSubscriptionCount}`,
                            inline: true
                        }
                    )
                    .setColor('Blurple')
            ]
        })

    }
};