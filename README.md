# Reminder Bot Example

A simple bot that sets up reminders for users and messages them back. It consists 
of three files:

* `index.js` - the chat bot server
* `dialog.js` - the interaction dialog for the bot
* `jobs.js` - the reminder job that the bot runs

The bot is dependent on a large number of yowl packages.

* `yowl` - the root yowl package for chatbots
* `yowl-platform-cli` - communicate with yowl via the command line
* `yowl-platform-facebook` - communicate with yowl via facebook messenger
* `yowl-dialog-manager` - manage conversational flow of the bot
* `yowl-session-redis` - persist yowl sessions in redis
* `yowl-jobs-kue` - schedule reminders to be run at some point in the future
* `yowl-parse-dates` - parse natural language dates in messages

The combined functionality of these packages allows us to implement a basic
chatbot in a well structured project using relatively small number of lines
of code.

## Run Locally

    node index.js --local --session XXXX --auth

Replace `XXXX` with a unique session id.

## Run of Facebook

Follow the instructions in the [yowl-platform-facebook readme](https://github.com/brianbrunner/yowl-platform-facebook)
to get setup with Facebook messenger.

Then, run with the following command:

    node index.js
