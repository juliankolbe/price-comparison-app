'use strict';
var redis   = require('redis'),
    config  = require('../config/config.dev.json'),
    logger  = require('_/logger');

var redisClient = function () {

    var client = null,
        redisConfig = config.redisConfig,

        connect = function () {
             if (client && client.connected) {
                 return client;
             }

             var options = (redisConfig.password) ? { auth_pass: redisConfig.password } : {};

             client = redis.createClient(redisConfig.port, redisConfig.host, options);

             client.on('connect', function() {
               //user logger later
               logger.info('Connected to Redis');
                // console.log('Connected to Redis');
             });

             client.on('error', function(err) {
               logger.info('Error with Redis: '+err);
                // console.log('Error with Redis: ' + err);
             });

             if (redisConfig.password) {
                client.auth(redisConfig.password);
             }

             return client;
        },
        close = function() {
             client.quit();
        };

    return {
        connect:  connect,
        close: close
    };

}();

module.exports = redisClient;
