const { } = require('discord.js');

module.exports = {
    name: 'reload-commands',
    description: 'Reload all the commands.',
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
            require('../../handlers/application_commands')(client, config);

            return interaction.editReply({
                content: '\`✅\` Loaded all the commands, no errors were found.',
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