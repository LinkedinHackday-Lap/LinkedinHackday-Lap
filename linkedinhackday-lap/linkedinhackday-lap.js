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



}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });




}


