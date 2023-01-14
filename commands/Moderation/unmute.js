const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'unmute',
    description: 'Unmute a user.',
    type: 1,
    options: [
        {
            name: 'user',
            description: 'The user to unmute.',
            type: 6,
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for the unmute.',
            type: 3,
            required: false
        }
    ],
    role_perms: ['981187294927142912'],
    developers_only: false,
    category: 'Information',
    run: async (client, interaction, config) => {
        const userInput = interaction.options.get('user').value;
        const reasonInput = interaction.options.get('reason')?.value || 'No reason was provided';

        const user = interaction.guild.members.cache.get(userInput);

        if (!user) return interaction.reply({
            content: `\`❌\` The user is not in the guild.`,
            ephemeral: true
        });

        if (!user.isCommunicationDisabled()) return interaction.reply({
            content: `\`❌\` The user is already unmuted.`,
            ephemeral: true
        });

        try {
            await user.timeout(null, reasonInput);

            interaction.reply({
                content: `\`✅\` ${user} has been successfully unmuted!`,
                ephemeral: true
            });

            return interaction.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${user} has been unmuted.`)
                        .setColor('Green')
                ]
            });
        } catch {
            return interaction.reply({
                content: `\`❌\` Something went wrong!`,
                ephemeral: true
            });
        };
    }
};