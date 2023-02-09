const fs = require('fs');
const { BetterConsoleLogger, Colors } = require('discord.js-v14-helper');

module.exports = (client, config) => {
    for (let file of fs.readdirSync('./events')) {
        require('../events/' + file);
        
        new BetterConsoleLogger('Loaded client event: ' + file + '.')
            .setTextColor(Colors.Green)
            .log(true);
    };
};
