const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = {
    name: "embed-builder",
    description: "Create an embed message!",
    type: 1,
    options: [
        {
            name: "channel",
            description: "The channel where you want the embed message will be sent.",
            type: 7,
            required: false
        }
    ],
    role_perms: ['981187294927142912'],
    developers_only: false,
    category: 'Administration',
    run: async (client, interaction, config) => {
        const channel = interaction.guild.channels.cache.get(interaction.options.get('channel')?.value || interaction.channel.id);

        if(!channel) return interaction.reply({
            content: `\`❌\` Invalid channel.`,
            ephemeral: true
        });

        const embedMain = new EmbedBuilder()
            .setTitle('Embed Builder')
            .setDescription('Select an embed builder constructer in the select menu below to edit the embed message.')
            .setColor('Blurple');

        let embedToEdit = new EmbedBuilder()
            .setDescription('Edit me!');

        interaction.reply({
            embeds: [
                embedMain,
                embedToEdit
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('embed_builder')
                        .setPlaceholder('Nothing selected.')
                        .addOptions(
                            {
                                label: "Embed Author",
                                value: "author"
                            },
                            {
                                label: "Embed Title",
                                value: "title"
                            },
                            {
                                label: "Embed Description",
                                value: "desc"
                            },
                            {
                                label: "Embed Footer",
                                value: "footer"
                            },
                            {
                                label: "Embed Color",
                                value: "color"
                            },
                            {
                                label: "Embed Image",
                                value: "image"
                            },
                            {
                                label: "Embed Thumbnail",
                                value: "thumbnail"
                            }
                        )
                ),
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('embed_creator_save')
                        .setLabel('Save & Send')
                        .setEmoji('📨')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId('embed_creator_restart')
                        .setLabel('Restart')
                        .setEmoji('🔁')
                        .setStyle(ButtonStyle.Danger),
                    new ButtonBuilder()
                        .setCustomId('embed_creator_end')
                        .setLabel('End Interaction')
                        .setEmoji('🛑')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('embed_creator_help')
                        .setLabel('Help')
                        .setEmoji('ℹ️')
                        .setStyle(ButtonStyle.Primary),
                )
            ],
        });

        const collectorMENU = interaction.channel.createMessageComponentCollector({
            type: ComponentType.StringSelect,
            filter: i => i.user.id === interaction.user.id
        });

        collectorMENU.on('collect', async (i) => {
            if (!i.values) return;

            const ID = i.values[0];

            // Author:
            if (ID === "author") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Please type in this channel the content that should be in the Author Embed.')
                            .setColor('Blue')
                            .setFooter({
                                text: "Type \"cancel\" to cancel this interaction."
                            })
                    ],
                    ephemeral: true
                }).catch(() => { });

                const filter = (m) => m.author.id === i.user.id

                await interaction.channel.awaitMessages({
                    filter: filter,
                    max: 1
                }).then(async (received) => {
                    received.first().delete().catch(() => { });

                    const message = received.first().content.substr(0, 256);

                    if (message === "cancel") {
                        return i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Cancelled.')
                                    .setColor('Yellow')
                            ]
                        });
                    };

                    embedToEdit.setAuthor({ name: message });

                    i.editReply({
                        content: `\`✅\` Embed \`author\` has been successfully set.`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
                });
            };

            // Title:
            if (ID === "title") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Please type in this channel the content that should be in the Title Embed.')
                            .setColor('Blue')
                            .setFooter({
                                text: "Type \"cancel\" to cancel this interaction."
                            })
                    ],
                    ephemeral: true
                }).catch(() => { });

                const filter = (m) => m.author.id === i.user.id

                await interaction.channel.awaitMessages({
                    filter: filter,
                    max: 1
                }).then(async (received) => {
                    received.first().delete().catch(() => { });

                    const message = received.first().content.substr(0, 256);

                    if (message === "cancel") {
                        return i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Cancelled.')
                                    .setColor('Yellow')
                            ]
                        });
                    };

                    embedToEdit.setTitle(message);

                    i.editReply({
                        content: `\`✅\` Embed \`title\` has been successfully set.`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
                });
            };

            // Description:
            if (ID === "desc") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Please type in this channel the content that should be in the Description Embed.')
                            .setColor('Blue')
                            .setFooter({
                                text: "Type \"cancel\" to cancel this interaction."
                            })
                    ],
                    ephemeral: true
                }).catch(() => { });

                const filter = (m) => m.author.id === i.user.id

                await interaction.channel.awaitMessages({
                    filter: filter,
                    max: 1
                }).then(async (received) => {
                    received.first().delete().catch(() => { });

                    const message = received.first().content.substr(0, 4096);

                    if (message === "cancel") {
                        return i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Cancelled.')
                                    .setColor('Yellow')
                            ]
                        });
                    };

                    embedToEdit.setDescription(message);

                    i.editReply({
                        content: `\`✅\` Embed \`description\` has been successfully set.`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
                });
            };

            // Footer:
            if (ID === "footer") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Please type in this channel the content that should be in the Footer Embed.')
                            .setColor('Blue')
                            .setFooter({
                                text: "Type \"cancel\" to cancel this interaction."
                            })
                    ],
                    ephemeral: true
                }).catch(() => { });

                const filter = (m) => m.author.id === i.user.id

                await interaction.channel.awaitMessages({
                    filter: filter,
                    max: 1
                }).then(async (received) => {
                    received.first().delete().catch(() => { });

                    const message = received.first().content.substr(0, 2048);

                    if (message === "cancel") {
                        return i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Cancelled.')
                                    .setColor('Yellow')
                            ]
                        });
                    };

                    embedToEdit.setFooter({ text: message });

                    i.editReply({
                        content: `\`✅\` Embed \`footer#text\` has been successfully set.`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
                });
            };

            // Color:
            if (ID === "color") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Please type in this channel the color name or HEX code that should be in the Color Embed.')
                            .setFooter({
                                text: "Type \"cancel\" to cancel this interaction.\nNote: For Discord API, you need to provide colors like \"Blue\", \"Red\"... etc. The color name always starts with a capital letter."
                            })
                            .setColor('Blue')
                    ],
                    ephemeral: true
                }).catch(() => { });

                const filter = (m) => m.author.id === i.user.id

                await interaction.channel.awaitMessages({
                    filter: filter,
                    max: 1
                }).then(async (received) => {
                    received.first().delete().catch(() => { });

                    const message = received.first().content.substr(0, 256);

                    if (message === "cancel") {
                        return i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Cancelled.')
                                    .setColor('Yellow')
                            ]
                        });
                    };

                    try {
                        embedToEdit.setColor(message);
                    } catch (e) {
                        embedToEdit.setColor('Default');
                    };

                    i.editReply({
                        content: `\`✅\` Embed \`color\` has been successfully set.`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
                });
            };

            // Image:
            if (ID === "image") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Please provide a valid image URL in the channel for the Embed Image.')
                            .setFooter({
                                text: "Type \"cancel\" to cancel this interaction.\nNote: Make sure that the link starts with \"https://\"! Else, it will show nothing."
                            })
                            .setColor('Blue')
                    ],
                    ephemeral: true
                }).catch(() => { });

                const filter = (m) => m.author.id === i.user.id

                await interaction.channel.awaitMessages({
                    filter: filter,
                    max: 1
                }).then(async (received) => {
                    received.first().delete().catch(() => { });

                    const message = received.first().content.substr(0, 256);

                    if (message === "cancel") {
                        return i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Cancelled.')
                                    .setColor('Yellow')
                            ]
                        });
                    };

                    try {
                        embedToEdit.setImage(message);
                    } catch (e) {
                        embedToEdit.setImage(null);
                    };

                    i.editReply({
                        content: `\`✅\` Embed \`image\` has been successfully set.`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
                });
            };

            // Thumbnail:
            if (ID === "thumbnail") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Please provide a valid image URL in the channel for the Embed Thumbnail.')
                            .setFooter({
                                text: "Type \"cancel\" to cancel this interaction.\nNote: Make sure that the link starts with \"https://\"! Else, it will show nothing."
                            })
                            .setColor('Blue')
                    ],
                    ephemeral: true
                }).catch(() => { });

                const filter = (m) => m.author.id === i.user.id

                await interaction.channel.awaitMessages({
                    filter: filter,
                    max: 1
                }).then(async (received) => {
                    received.first().delete().catch(() => { });

                    const message = received.first().content.substr(0, 256);

                    if (message === "cancel") {
                        return i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Cancelled.')
                                    .setColor('Yellow')
                            ]
                        });
                    };

                    try {
                        embedToEdit.setThumbnail(message);
                    } catch (e) {
                        embedToEdit.setThumbnail(null);
                    };

                    i.editReply({
                        content: `\`✅\` Embed \`thumbnail\` has been successfully set.`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
                });
            };
        });

        const collectorBUTTONS = interaction.channel.createMessageComponentCollector({
            type: ComponentType.Button,
            filter: i => i.user.id === interaction.user.id
        });

        collectorBUTTONS.on('collect', async (i) => {
            const ID = i.customId;

            if (ID === "embed_creator_save") {
                channel.send({
                    embeds: [
                        embedToEdit
                    ]
                }).catch(() => { });

                await i.reply({
                    content: `\`✅\` Sent! Check the channel ${channel}.`,
                    ephemeral: true
                }).catch(() => { });

                interaction.deleteReply();

                return collectorBUTTONS.stop();
            };

            if (ID === "embed_creator_restart") {
                embedToEdit.setAuthor(null);
                embedToEdit.setTitle(null);
                embedToEdit.setDescription("Edit me!");
                embedToEdit.setFooter(null);
                embedToEdit.setColor(null);

                i.reply({
                    content: `\`✅\` Restarted.`,
                    ephemeral: true
                }).catch(() => { });

                return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
            };

            if (ID === "embed_creator_end") {
                interaction.deleteReply();

                return collectorBUTTONS.stop();
            };

            if (ID === "embed_creator_help") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('How to create an embed message')
                            .setDescription(`To edit the embed message given, select a choice for the embed in the select menu. After selecting, type anything in the chat so I saves it into the Embed.
                            Read the instructions from an embed message that is going shown when you have selected a choice.`)
                            .setColor('Blue')
                    ],
                    ephemeral: true
                }).catch(() => { });
            };
        });

    },
};
