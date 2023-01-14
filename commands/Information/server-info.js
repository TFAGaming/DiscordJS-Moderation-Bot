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

        const verificationLevelObj = {
            0: 'None',
            1: 'Low',
            2: 'Medium',
            3: 'High',
            4: 'Very high'
        };

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Server info: ' + guild.name)
                    .setThumbnail(guild.iconURL())
                    .addFields(
                        {
                            name: 'Guild ID',
                            value: `\`${guild.id}\``,
                            inline: true
                        },
                        {
                            name: 'Server owner',
                            value: `${await guild.fetchOwner().then((u) => u.user.tag)}`,
                            inline: true
                        },
                        {
                            name: 'Created at',
                            value: `<t:${(guild.createdTimestamp / 1000).toString().split('.')[0]}> (<t:${(guild.createdTimestamp / 1000).toString().split('.')[0]}:R>)`,
                            inline: true
                        },
                        {
                            name: 'Verification level',
                            value: `${verificationLevelObj[guild.verificationLevel]}`,
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
                        },
                        {
                            name: 'Total emojis',
                            value: `${guild.emojis.cache.size}`,
                            inline: true
                        },
                        {
                            name: 'Max members to join',
                            value: `${guild.maximumMembers}`,
                            inline: true
                        }
                    )
                    .setColor('Blurple')
            ]
        })

    }
};
