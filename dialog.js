var moment = require('moment');

var DialogManager = require('yowl-dialog-manager')();

DialogManager.add('greet', {
  test: function(context, event) {
    return !context.session.greeted;
  },
  messages: [
    "Hello there!",
    "I can help you remember to do things!"
  ],
  after: function(context, event, callback) {
    context.session.greeted = true;
    this.manager.dialogs.add_reminder.play(context, event, callback);
  }
});

DialogManager.add('add_reminder', {
  test: true,
  messages: [
    'What do you what me to remind you to do?'
  ],
  onresponse: function(context, event, callback) {
    if (event.message) {
      context.session.reminder = event.message;
      this.manager.dialogs.set_date.play(context, event, callback);
    } else {
      this.manager.dialogs.error_reminder.play(context, event, callback);
    }
  }
});

DialogManager.add('error_reminder', {
  messages: [
    'Sorry, I couldn\'t make sense of that.',
  ],
  after: function(context, event, callback) {
    this.manager.dialogs.add_reminder.play(context, event, callback);
  }
});

DialogManager.add('set_date', {
  messages: [
   'When do you want me to remind you to {reminder}?'
  ],
  onresponse: function(context, event, callback) {
    var dates = event.parseDates();
    if (dates.length == 0 || dates.length >= 2) {
      this.manager.dialogs.error_date.play(context, event, callback);
    } else {
      context.session.date = dates[0].start.date();
      if (context.session.date < Date.now()) {
        context.session.date.setDate(context.session.date.getDate() + 1);
      }
      this.manager.dialogs.confirm_reminder.play(context, event, callback);
    }
  }
});

DialogManager.add('error_date', {
  messages: [
    'Sorry, I couldn\'t make sense of that.',
    'Please enter just one date.'
  ],
  after: function(context, event, callback) {
    this.manager.dialogs.set_date.play(context, event, callback);
  }
});

DialogManager.add('confirm_reminder', {
  before: function(context, event) {
    context.session.datestring = moment(context.session.date).fromNow();
  },
  messages: [
    'Alright, I\'ll remind you to {reminder} {datestring}.'
  ],
  after: function(context, event) {
    var date = context.session.date;
    var delay = moment(date).diff();
    context
      .createJob('remind', { reminder: context.session.reminder })
      .delay(delay)
      .save()
    delete context.session.reminder;
    delete context.session.date;
    delete context.session.datestring;
  }
});

module.exports = DialogManager;
