const { ChannelType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'channel',
    description: 'Lock or unlock a channel.',
    type: 1,
    options: [
        {
            name: 'lock',
            description: 'Lock a channel.',
            type: 1,
            options: [
                {
                    name: 'channel',
                    description: 'The channel to lock.',
                    type: 7,
                    channel_types: [
                        ChannelType.GuildText,
                        ChannelType.GuildVoice
                    ],
                    required: false
                },
                {
                    name: 'reason',
                    description: 'The reason for the lock.',
                    type: 3,
                    required: false
                }
            ]
        },
        {
            name: 'unlock',
            description: 'Unlock a channel.',
            type: 1,
            options: [
                {
                    name: 'channel',
                    description: 'The channel to unlock.',
                    type: 7,
                    channel_types: [
                        ChannelType.GuildText,
                        ChannelType.GuildVoice
                    ],
                    required: false
                }
            ]
        }
    ],
    role_perms: ['981187294927142912'],
    developers_only: false,
    category: 'Moderation',
    run: async (client, interaction, config) => {
        const channelInput = interaction.options.get('channel')?.value || interaction.channel.id;
        const reasonInput = interaction.options.get('reason')?.value || 'No reason was provided';
        const subCommandInput = interaction.options._subcommand;

        const data = require('../../config/data.json').handler.commands['lock-unlock'].roles_to_update;

        const channel = interaction.guild.channels.cache.get(channelInput);

        if (!channel) return interaction.reply({
            content: `\`❌\` Invalid channel.`,
            ephemeral: true
        });

        if (subCommandInput === 'lock') {
            await data.forEach(async (role) => {
                try {
                    const roleFetch = await interaction.guild.roles.cache.get(role);

                    if (!roleFetch) return;

                    return await channel.permissionOverwrites.edit(roleFetch.id, {
                        SendMessages: false,
                        AddReactions: false
                    });
                } catch { return };
            });

            interaction.reply({
                content: `\`✅\` The channel ${channel} has been locked.`,
                ephemeral: true
            });

            return channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Channel locked')
                        .setDescription(`This channel is now locked, nobody can chat except for the server staff members.`)
                        .addFields({
                            name: 'Reason',
                            value: reasonInput
                        })
                        .setFooter({
                            text: `Locked on: ${new Date().toLocaleDateString()}`
                        })
                        .setColor('Red')
                ]
            });
        } else {
            await data.forEach(async (role) => {
                try {
                    const roleFetch = await interaction.guild.roles.cache.get(role);

                    if (!roleFetch) return;

                    return await channel.permissionOverwrites.edit(roleFetch.id, {
                        SendMessages: null,
                        AddReactions: null
                    });
                } catch { return };
            });

            interaction.reply({
                content: `\`✅\` The channel ${channel} has been unlocked.`,
                ephemeral: true
            });

            return channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Channel unlocked')
                        .setDescription(`This channel is now unlocked, anybody can chat for now.`)
                        .setFooter({
                            text: `Unlocked on: ${new Date().toLocaleDateString()}`
                        })
                        .setColor('Green')
                ]
            });
        };
    }
};