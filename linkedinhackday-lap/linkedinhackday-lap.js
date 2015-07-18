if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.list.helpers({
    twilio: function() {
      return Twilio("AC174ce99727c8471edfc0f5731b544423", "f9c45bf2f7e702d0782106bc9027521a");
    },
    phonenumber: function() {
      return "+18594485127";
    }
  });

  Template.list.events({
    'click button': function() {
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
