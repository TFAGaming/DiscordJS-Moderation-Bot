const { EmbedBuilder, codeBlock } = require('discord.js');

module.exports = {
    name: 'uptime',
    description: 'Check the client\'s uptime.',
    type: 1,
    options: [],
    role_perms: null,
    developers_only: false,
    category: 'Information',
    run: async (client, interaction) => {
        const date = new Date().getTime() - (client.uptime);

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: client.user.username,
                        iconURL: client.user.displayAvatarURL({ dynamic: true })
                    })
                    .setDescription(`Started on: <t:${(new Date(date).getTime() / 1000).toString().split('.')[0]}> (<t:${(new Date(date).getTime() / 1000).toString().split('.')[0]}:R>)`)
                    .setColor('Green')
            ]
        });

    },
};
