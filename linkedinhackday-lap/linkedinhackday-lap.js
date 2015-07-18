if (Meteor.isClient) {
  Router.map(function() {
    this.route('hello', {
      path: '/'
    });
    this.route('about', {
      path: '/about'
    })
  });
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
    phonenumber: function() {
      return "+18594485127";
    }
  });

  Template.hello.events({
    'submit form': function(event){
      event.preventDefault();
      // code goes here
      name = event.target.name.value;
      phone = event.target.phone.value;
      console.log("name",name);
      console.log("phone",phone);
      Meteor.call("sendSMS", name, phone);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
      Meteor.methods({
        sendSMS: function(name, phone, message) {
          twilio = Twilio("AC7c71001f691d9f320b0e69116042ee34", "8842bd2d380a05ba6e8197212dff6683");
          twilio.sendSms({
              to: phone, // Any number Twilio can deliver to 
              from: '+18594485127', // A number you bought from Twilio and can use for outbound communication 
              body: 'Hello ' + name + '!' // body of the SMS message 
            }, function(err, responseData) { //this function is executed when a response is received from Twilio 
              if (!err) { // "err" is an error received during the request, if any 
                // "responseData" is a JavaScript object containing data received from Twilio. 
                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript): 
                // http://www.twilio.com/docs/api/rest/sending-sms#example-1 
                console.log(responseData.from); // outputs "+14506667788" 
                console.log(responseData.body); // outputs "word to your mother." 
              }
              console.log(err);
          });
        }
      });
  });
}