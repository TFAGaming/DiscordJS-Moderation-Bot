const fs = require('fs');
const { betterConsole, Colors } = require('discord.js-v14-helper');

module.exports = (client, config) => {
    for (let file of fs.readdirSync('./events')) {
        require('../events/' + file);
        
        console.log(
            betterConsole(`Loaded client event: ${file}`, {
                color: Colors.GREEN
            })
        );
    };
};