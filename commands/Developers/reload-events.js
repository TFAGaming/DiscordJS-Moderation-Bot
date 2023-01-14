const { } = require('discord.js');

module.exports = {
    name: 'reload-events',
    description: 'Reload all the events.',
    type: 1,
    options: [],
    role_perms: null,
    developers_only: true,
    category: 'Developers',
    run: async (client, interaction, config) => {

        await interaction.reply({
            content: '`•••` Loading...',
            ephemeral: true
        });

        try {
            require('../../handlers/events')(client, config);

            return interaction.editReply({
                content: '\`✅\` Loaded all the events, no errors were found.',
                ephemeral: true
            });
        } catch (err) {
            return interaction.editReply({
                content: `\`❌\` An error was found:\n${err}`,
                ephemeral: true
            });
        };

    }
};