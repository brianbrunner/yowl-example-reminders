// Packages
var yowl = require('yowl');
var local = require('yowl-platform-cli');
var facebook = require('yowl-platform-facebook');
var parseDates = require('yowl-parse-dates');
var redis = require('yowl-session-redis');

// Local
var jobs = require('./jobs');
var DialogManager = require('./dialog');

// Instantiate Our Bot
var bot = yowl();

// Add Our Platforms
bot.extend(local);
bot.extend(facebook({ verificationToken: 'your-verification-token',
                        accessToken: 'your-access-token',
                        webhook: '/webhook/facebook' }));

// Add Our Jobs
// This MUST be called after adding all platforms
bot.extend(jobs);

// Add Our Redis Session Management
bot.use(redis());

// Middleware for helping with natural language
bot.use(parseDates);

// Conversation Management
bot.use(DialogManager);

// Start our bot!!!
bot.run(5000);
console.log("Now running on port 5000...");
