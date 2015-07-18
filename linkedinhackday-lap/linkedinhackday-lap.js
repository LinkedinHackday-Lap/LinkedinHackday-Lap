if (Meteor.isClient) {
  Router.route('/', {
    template: 'hello'
  });
  Router.route('/about', {
    template: 'about'
  });
  Router.route('/resources', {
    template: 'resources'
  });
  var phone;
  var name;
  var iso;
  var grid;

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

  Template.resources.helpers({
    categories: [
      { text: "legal" },
      { text: "general" },
      { text: "women" },
      { text: "employment" }
    ],
    resources: [
      {
        heading: "Driver's License",
        description: "Depending on your state, you'll need to find the nearest Department of Motor Vehicles. Some things to bring with you are your Social Security card and a state-issued government ID. Every state is different. Click the link to see your state's requirements.",
        website: "http://www.dmv.org/apply-license.php",
        category: "legal"
      },
      {
        heading: "Social Security",
        description: "The Social Security administration has a re-entry program. If you are living in a halfway house, you are not eligible for benefits, due to the fact that you are still under custody of the Department of Corrections. However, when your conviction is finished, you can resume receiving benefits.",
        website: "http://www.ssa.gov/reentry/",
        category: "legal"
      },
      {
        heading: "Re-entry Resources",
        description: "The Prison Activist Resource Center has a list of different programs and resources available for those who are going through re-entry. L.A.P. recommends Project Return because they provide job and community training as well as have a pre-release program.",
        website: "https://www.prisonactivist.org/resources/re-entry",
        category: "general"
      },
      {
        heading: "Re-entry State Programs",
        description: "Exoffenders.net gives resources and other curated articles related to re-entry. There are a list of states that have re-entry programs that you can seek out. Click the link to see if your state is on the list.",
        website: "https://exoffenders.net/reentry-programs-assistance/",
        category: "general"
      },
      {
        heading: "Women's Needs",
        description: "Justice Now is a program that focuses on female prisoner re-entry. They provide resources and legal services on healthcare access and offer assistance with parental rights issues.",
        website: "https://www.prisonactivist.org/resources/justice-now-1",
        category: "women"
      },
      {
        heading: "Employment Opportunities",
        description: "There are many companies that have locations all over the country with felon-friendly employment programs. Exoffenders.net has compiled a list as well as a search engine for all available job listings.",
        website: "http://local.exoffenders.net/",
        category: "employment"
      },
      {
        heading: "Felon-Friendly Employers",
        description: "There is a comprehensive list of felon-friendly employers throughout the country compiled at Exoffenders.net.",
        website: "https://exoffenders.net/employment-jobs-for-felons/",
        category: "employment"
      },
      {
        heading: "Job Application Basics",
        description: "Many companies will require a job application as well as an interview. You can still be eligible for employment even if you are an ex-offender. Many job applications will do some background checks as well. Click the link for interview tips.",
        website: "https://www.iseek.org/exoffenders/find-job/interview-tips-ex-offenders.html",
        category: "employment"
      }
    ]
  });

  Template.resources.onRendered(function() {
    grid = document.querySelector('.grid');
    iso = new Isotope( grid, {
      // options
      itemSelector: '.grid-item',
      layoutMode: 'fitRows'
    });
  });

  Template.resources.events({
    'click .categoryFilter': function(event) {
      event.preventDefault();
      var category = "*";
      if (event.currentTarget.getAttribute('href') !== '*') {
        var category = "." + event.currentTarget.getAttribute('href');
      }
      console.log(category);
      iso.arrange({ filter: category });
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