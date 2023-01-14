const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'user-info',
    description: 'Get a user information.',
    type: 1,
    options: [
        {
            name: 'user',
            description: 'The user to get their information.',
            type: 6,
            required: false
        }
    ],
    role_perms: null,
    developers_only: false,
    category: 'Information',
    run: async (client, interaction, config) => {

        const user = interaction.guild.members.cache.get(interaction.options.get('user')?.value || interaction.user.id);

        if (!user) return interaction.reply({
            content: `\`❌\` The user is not in the guild.`,
            ephemeral: true
        });

        let rr;

        const roles = user.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);

        rr = roles.join(", ");

        if (user.roles.cache.size < 1) rr = "No roles";

        function fetchAcknowledgements(userInput) {
            let result;

            try {
                if (userInput.permissions.has(PermissionsBitField.ViewChannel)) result = "Server Member";
                if (userInput.permissions.has(PermissionsBitField.KickMembers)) result = "Server Moderator";
                if (userInput.permissions.has(PermissionsBitField.ManageServer)) result = "Server Manager";
                if (userInput.permissions.has(PermissionsBitField.Administrator)) result = "Server Administrator";
                if (userInput.id === interaction.guild.ownerId) result = "Server Owner";

            } catch (e) {
                result = "Server Member";
            };

            return result;
        }

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('User info: ' + user.user.username)
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
                    .addFields(
                        {
                            name: 'User tag',
                            value: `${user.user.tag}`,
                            inline: true
                        },
                        {
                            name: 'Nickname',
                            value: `${user.displayName}`,
                            inline: true
                        },
                        {
                            name: 'Server booster?',
                            value: `${user.premiumSince === null ? 'No' : 'Yes'}`,
                            inline: true
                        },
                        {
                            name: 'Joined at',
                            value: `<t:${(user.joinedTimestamp / 1000).toString().split('.')[0]}> (<t:${(user.joinedTimestamp / 1000).toString().split('.')[0]}:R>)`,
                            inline: true
                        },
                        {
                            name: 'Created at',
                            value: `<t:${(user.user.createdTimestamp / 1000).toString().split('.')[0]}> (<t:${(user.user.createdTimestamp / 1000).toString().split('.')[0]}:R>)`,
                            inline: true
                        },
                        {
                            name: 'Bot?',
                            value: `${user.user.bot ? 'Yes' : 'No'}`,
                            inline: true
                        },
                        {
                            name: `Roles [${(user?.roles?.cache?.size - 1) || 0}]`,
                            value: `${rr || "No roles"}`,
                            inline: false
                        },
                        {
                            name: 'Acknowledgements',
                            value: `${fetchAcknowledgements(user) || "Server Member"}`,
                            inline: true
                        },
                    )
                    .setColor('Blurple')
            ]
        })

    }
};
