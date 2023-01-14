const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Help command',
    type: 1,
    options: [],
    role_perms: null,
    developers_only: false,
    category: 'Information',
    run: async (client, interaction, config) => {
        let categories = [];

        client.commands.forEach((cmd) => {
            if (!cmd.category) return;
            if (categories.includes(cmd.category)) return;

            categories.push(cmd.category);
        });

        const emojisData = require('../../config/data.json').handler.directories.emojis;

        let components = [
            new StringSelectMenuBuilder()
                .setCustomId('select_menu')
                .setPlaceholder('Select a category here!')
                .addOptions(
                    categories.map((cat) => {
                        return {
                            label: cat,
                            value: cat,
                            emoji: emojisData[cat] || '⬛'
                        }
                    })
                )
        ];

        let msg = await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Help menu')
                    .setDescription('Please select a category from the select menu below.')
                    .setColor('Blurple')
            ],
            components: [
                new ActionRowBuilder()
                    .addComponents(
                        components[0]
                    )
            ],
            fetchReply: true
        });

        const collector = interaction.channel.createMessageComponentCollector({
            filter: (int) => int.user.id === interaction.user.id,
            time: 30000
        });

        collector.on('collect', async (i) => {
            return i.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Category: ' + i.values[0])
                        .addFields(
                            client.commands
                                .filter((cmd) => cmd.category === i.values[0])
                                .map((cmd) => {
                                    if (cmd.type === 1) {
                                        return {
                                            name: `- \`/${cmd.name}\``,
                                            value: `> ${cmd.description}`,
                                            inline: true
                                        }
                                    } else {
                                        return
                                    };
                                })
                        )
                        .setColor('Blue')
                ],
                ephemeral: true
            });
        });

        collector.on('end', async () => {
            msg.edit({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Help menu - Expired')
                        .setDescription('Your menu has been expired after 30 seconds of timeout, please try to use the command again.')
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            components[0]
                                .setDisabled(true)
                        )
                ]
            })
        });

    }
};