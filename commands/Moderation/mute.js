const { EmbedBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'mute',
    description: 'Mute a user.',
    type: 1,
    options: [
        {
            name: 'user',
            description: 'The user to mute.',
            type: 6,
            required: true
        },
        {
            name: 'duration',
            description: 'The duration for the mute.',
            type: 3,
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for the mute.',
            type: 3,
            required: false
        }
    ],
    role_perms: ['981187294927142912'],
    developers_only: false,
    category: 'Moderation',
    run: async (client, interaction, config) => {
        const userInput = interaction.options.get('user').value;
        const durationInput = interaction.options.get('duration').value;
        const reasonInput = interaction.options.get('reason')?.value || 'No reason was provided';

        const user = interaction.guild.members.cache.get(userInput);
        const duration = ms(durationInput);

        if (!user) return interaction.reply({
            content: `\`❌\` The user is not in the guild.`,
            ephemeral: true
        });

        if (user.isCommunicationDisabled()) return interaction.reply({
            content: `\`❌\` The user is already muted.`,
            ephemeral: true
        });

        if (duration <= 0 || duration > 2419200000) return interaction.reply({
            content: `\`❌\` The duration should be not equal to **0s/m/d/w** or under/equal to **28 days**. `,
            ephemeral: true
        });

        try {
            await user.timeout(duration, reasonInput);

            user.send({
                content: `You have been muted in **${interaction.guild.name}** for ${durationInput}. ${reasonInput}`
            }).catch(() => { });

            interaction.reply({
                content: `\`✅\` ${user} has been successfully muted for ${durationInput}!`,
                ephemeral: true
            });

            return interaction.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${user} has been muted for ${durationInput}.`)
                        .setColor('Yellow')
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