const { MongoDBConnector } = require('discord.js-v14-helper');

module.exports = (client, config) => {
    new MongoDBConnector(require('../config/main').database.mongodb_uri)
        .startConnecting();
};