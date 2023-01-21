const { MongoDBConnector } = require('discord.js-v14-helper');

module.exports = (client, config) => {
    const connector = new MongoDBConnector(require('../config/main').database.mongodb_uri);
    
    connector.start();
};
