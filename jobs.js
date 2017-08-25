var queue = require('yowl-jobs-kue')();

queue.process('remind', function(context, event, done) {
  var reminder = event.job.data.reminder;
  event.send("Hey there! You told me to remind you to " + reminder, done);
});

module.exports = queue;
