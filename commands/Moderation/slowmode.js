const { EmbedBuilder, ChannelType } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'slowmode',
    description: 'Set a slowmode in a channel.',
    type: 1,
    options: [
        {
            name: 'duration',
            description: 'The duration for the slowmode.',
            type: 3,
            required: true
        },
        {
            name: 'channel',
            description: 'The channel to set the slowmode.',
            type: 7,
            channel_types: [ChannelType.GuildText],
            required: false
        }
    ],
    role_perms: ['981187294927142912'],
    developers_only: false,
    category: 'Moderation',
    run: async (client, interaction, config) => {
        const durationInput = interaction.options.get('duration').value;
        const channelInput = interaction.options.get('channel')?.value || interaction.channel.id;

        const duration = ms(durationInput);
        const channel = interaction.guild.channels.cache.get(channelInput);

        if (!channel) return interaction.reply({
            content: `\`❌\` The channel is not in the guild.`,
            ephemeral: true
        });

        if (duration > 21600000 || duration < 0) return interaction.reply({
            content: `\`❌\` The slowmode cannot be **negative** or over **6h**.`,
            ephemeral: true
        });

        try {
            if (duration > 0) {
                await channel.setRateLimitPerUser(duration / 1000);

                interaction.reply({
                    content: `\`✅\` Successfully set slowmode in ${channel}!`,
                    ephemeral: true
                });

                return channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`Slowmode has been changed to **${durationInput}**.`)
                            .setColor('Blue')
                    ]
                });
            } else {
                await channel.setRateLimitPerUser(null);

                interaction.reply({
                    content: `\`✅\` Successfully disabled slowmode in ${channel}!`,
                    ephemeral: true
                });

                return channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`Slowmode has been **disabled**.`)
                            .setColor('Blue')
                    ]
                });
            };
        } catch {
            return interaction.reply({
                content: `\`❌\` Something went wrong!`,
                ephemeral: true
            });
        };
    }
};