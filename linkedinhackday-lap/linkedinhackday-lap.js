if (Meteor.isClient) {
  
  var phone;
  var name;

  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    // counter: function () {
    //   return Session.get('counter');
    // }, 
    // test: function () {
    //   return Session.get('test');
    // }
  });

  Template.hello.events({
  
    'submit form': function(event){
        event.preventDefault();
        // code goes here
        name = event.target.name.value;
        phone = event.target.phone.value;
        console.log("name",name);
        console.log("phone",phone);
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

Meteor.Router

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });




}


