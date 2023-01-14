const { codeBlock, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'emoji-id',
    description: 'Get an emoji ID!',
    type: 1,
    options: [
        {
            name: 'emoji',
            description: 'The emoji. (Ex: :hello_lol:)',
            type: 3,
            required: true
        }
    ],
    role_perms: null,
    developers_only: false,
    category: 'Utility',
    run: async (client, interaction, config) => {
        const emojiInput = interaction.options.get('emoji').value;

        const emoji = await client.emojis.cache.get((e) => e.name === emojiInput);

        if (!emoji) return interaction.reply({
            content: `\`❌\` Invalid emoji.`,
            ephemeral: true
        });

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription('Emoji ID: ' + codeBlock('txt', emoji))
                    .setColor('Green')
            ]
        })
        
    }
};