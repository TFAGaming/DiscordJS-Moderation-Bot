const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kick a user.',
    type: 1,
    options: [
        {
            name: 'user',
            description: 'The user to kick.',
            type: 6,
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for the kick.',
            type: 3,
            required: false
        }
    ],
    role_perms: ['981187294927142912'],
    developers_only: false,
    category: 'Moderation',
    run: async (client, interaction, config) => {
        const userInput = interaction.options.get('user').value;
        const reasonInput = interaction.options.get('reason')?.value || 'No reason was provided';

        const user = interaction.guild.members.cache.get(userInput);

        if (!user) return interaction.reply({
            content: `\`❌\` The user is not in the guild.`,
            ephemeral: true
        });

        if (!user.kickable) return interaction.reply({
            content: `\`❌\` The user is not kickable.`,
            ephemeral: true
        });

        try {
            await interaction.guild.members.kick(userInput, { reason: reasonInput });

            user.send({
                content: `You have been kicked from **${interaction.guild.name}**. ${reasonInput}`
            }).catch(() => { });

            interaction.reply({
                content: `\`✅\` ${user} has been successfully kicked!`,
                ephemeral: true
            });

            return interaction.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${user} has been kicked.`)
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