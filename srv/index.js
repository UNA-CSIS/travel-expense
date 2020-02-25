import express from 'express';
var mongo = require('mongodb').MongoClient;
// import socketIO from "socket.io";
const app = express();
const url='mongodb://localhost:27017/';


export default (app, http) => {
  app.use(express.json());
  app.use(express.urlencoded({extended: true}))
  app.post('/api/user', function(request, response) {
    //console.log(request.body);
    //response.send(request.body);
    let name = request.body.name;
    let department = request.body.dept;
    let destination = request.body.dest;
    let travelDates = request.body.travelDates;
    let reason = request.body.reason;
    let plan = request.body.plan;
    let fees = request.body.fees;
    let expenses = request.body.expenses;
    let accomodation = request.body.accomodation;
    let otherExpenses = request.body.other;
    let subsistence = request.body.subsistence;
    let activityInformation = request.body.activityInformation;
    if (activityInformation == 'Attendance at Conference or Seminar') {
        let conferenceReason = request.body.conferenceReason;
        let conferenceTitle = request.body.conferenceTitle;
        let conferenceDates = request.body.conferenceDates;
        let conferenceWebsite = request.body.conferenceWebsite;
        let conferenceOther = request.body.conferenceOther;
        var data = {name: name, department: department, destination: destination, 
                travelDates: travelDates, reason: reason, plan: plan, fees: fees, expenses: expenses,
                accomodation: accomodation, otherExpenses: otherExpenses, subsistence: subsistence,
                activityInformation: activityInformation, conferenceReason: conferenceReason, conferenceTitle: conferenceTitle,
                conferenceDates: conferenceDates, conferenceWebsite: conferenceWebsite, conferenceOther: conferenceOther};
    }
    else if (activityInformation == 'Business Meeting') {
        let meetings = request.body.meetings;
        let attendees = request.body.attendees;
        let meetingDates = request.body.meetingDates;
        let meetingTime = request.body.meetingTime;
        let role = request.body.role;
        let purpose = request.body.purpose;
        var data = {name: name, department: department, destination: destination, 
          travelDates: travelDates, reason: reason, plan: plan, fees: fees, expenses: expenses,
          accomodation: accomodation, otherExpenses: otherExpenses, subsistence: subsistence,
          activityInformation: activityInformation, meetings: meetings, attendees: attendees, meetingDates: meetingDates,
          meetingTime: meetingTime, role: role, purpose: purpose};
    }
    else {
      var data = {name: name, department: department, destination: destination, 
        travelDates: travelDates, reason: reason, plan: plan, fees: fees, expenses: expenses,
        accomodation: accomodation, otherExpenses: otherExpenses, subsistence: subsistence,
        activityInformation: activityInformation};
    }
    //Validate data

    //Connect to database and store data
    mongo.connect(url, function(err, client) {
      if (err) throw err;
      let dbo = client.db("project");
      
      dbo.collection("expenseReports").insertOne(data, function(err, response) {
        if (err) throw err;
        ("Insert successful");
        client.close();
      });
      
    });
    //Respond with a page displaying the data again?
    response.send("Data sent to database");
  });

  app.get('/', function(request, response) {
    console.log("Used default / instead of api/user");
    response.send("default err");
  })

  app.listen(8888);

}
