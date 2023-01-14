const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: '8ball',
    description: 'Random fortune will tells you!',
    type: 1,
    options: [
        {
            name: 'question',
            description: 'The question to ask.',
            type: 3,
            required: true
        }
    ],
    role_perms: null,
    developers_only: false,
    category: 'Fun',
    run: async (client, interaction, config) => {
        const questionInput = interaction.options.get('question').value;

        const fortunes = [
            "Yes.",
            "It is certain.",
            "It is decidedly so.",
            "Without a doubt.",
            "Yes definelty.",
            "You may rely on it.",
            "As I see it, yes.",
            "Most likely.",
            "Outlook good.",
            "Signs point to yes.",
            "Reply hazy, try again.",
            "Ask again later.",
            "Better not tell you now...",
            "Cannot predict now.",
            "Concentrate and ask again.",
            "Don't count on it.",
            "My reply is no.",
            "My sources say no.",
            "Outlook not so good...",
            "Very doubtful.",
        ];

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('8Ball')
                    .addFields(
                        {
                            name: 'Question',
                            value: `${questionInput.endsWith('?') ? questionInput : `${questionInput}?`}`
                        },
                        {
                            name: 'Response',
                            value: `${fortunes[Math.floor(Math.random() * fortunes.length)]}`
                        }
                    )
                    .setColor('Blurple')
            ]
        })

    }
};