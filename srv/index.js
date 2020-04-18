import express from 'express';
var nodemailer = require('nodemailer');
var mongo = require('mongodb').MongoClient;
let cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// import socketIO from "socket.io";
const app = express();
const url='mongodb://localhost:27017/';
const homepage = "http://localhost:8080";
const login = "http://localhost:8080/login";

var serverEmailAccount = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'UNATravelForm@gmail.com',
    pass: 'UNATravelForm1!'
  }
});


export default (app, http) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({extended: true}))
  app.post('/api/user', function(request, response) {
    let username = request.body.username;
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
    let signature = request.body.signature;
    if (activityInformation == 'Attendance at Conference or Seminar') {
        let conferenceReason = request.body.conferenceReason;
        let conferenceTitle = request.body.conferenceTitle;
        let conferenceDates = request.body.conferenceDates;
        let conferenceWebsite = request.body.conferenceWebsite;
        let conferenceOther = request.body.conferenceOther;
        var data = {username: username, name: name, department: department, destination: destination, 
                travelDates: travelDates, reason: reason, plan: plan, fees: fees, expenses: expenses,
                accomodation: accomodation, otherExpenses: otherExpenses, subsistence: subsistence,
                activityInformation: activityInformation, signature: signature, conferenceReason: conferenceReason, conferenceTitle: conferenceTitle,
                conferenceDates: conferenceDates, conferenceWebsite: conferenceWebsite, conferenceOther: conferenceOther, confirmed: false};
    }
    else if (activityInformation == 'Business Meeting') {
        let meetings = request.body.meetings;
        let attendees = request.body.attendees;
        let meetingDates = request.body.meetingDates;
        let meetingTime = request.body.meetingTime;
        let role = request.body.role;
        let purpose = request.body.purpose;
        var data = {username: username, name: name, department: department, destination: destination, 
          travelDates: travelDates, reason: reason, plan: plan, fees: fees, expenses: expenses,
          accomodation: accomodation, otherExpenses: otherExpenses, subsistence: subsistence,
          activityInformation: activityInformation, signature: signature, meetings: meetings, attendees: attendees, meetingDates: meetingDates,
          meetingTime: meetingTime, role: role, purpose: purpose, confirmed: false};
    }
    else if (activityInformation == 'Marketing/Recruitment Event') {
      let otherReason = request.body.otherReason;
      var data = {username: username, name: name, department: department, destination: destination, 
        travelDates: travelDates, reason: reason, plan: plan, fees: fees, expenses: expenses,
        accomodation: accomodation, otherExpenses: otherExpenses, subsistence: subsistence,
        activityInformation: activityInformation, signature: signature, otherReason: otherReason, confirmed: false};
    }

    else {
      var data = {username: username, name: name, department: department, destination: destination, 
        travelDates: travelDates, reason: reason, plan: plan, fees: fees, expenses: expenses,
        accomodation: accomodation, otherExpenses: otherExpenses, subsistence: subsistence,
        activityInformation: activityInformation, signature: signature, confirmed: false};
    }
    //Validate data

    //Connect to database and store data
    mongo.connect(url, function(err, client) {
      if (err) throw err;
      let dbo = client.db("project");
      dbo.collection("expenseReports").insertOne(data, function(err, response) {
        if (err) throw err;
        client.close();
      });
      var mailOptions = {
        from: 'UNATravelForm@gmail.com',
        to: 'jmorris0899@yahoo.com',
        subject: 'New Travel Request Submitted',
        text: "A new travel request form has been submitted by " + name
      };
      
      serverEmailAccount.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' +info.response);
        }
      });
      dbo.collection("users").findOne({username: data.username}, function(err, result) {
        if(err) throw err;
        if(result != null) {
        var mailOptions = {
          from: 'UNATravelForm@gmail.com',
          to: result.email,
          subject: 'Travel Request Submitted',
          text: "Your travel request form has been submitted. You will be emailed again when it is confirmed/denied"
        };
        serverEmailAccount.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' +info.response);
          }
        });}
      });
        
      });
      //Respond with a page displaying the data again?
    
    response.redirect(homepage);
    });
    

  //User login
  app.post('/api/login', function(request, response) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      let user = request.body.username;
      let pwd = request.body.password;
      mongo.connect(url, function(err, client) {
        if (err) throw err;
        let dbo = client.db("project");
        bcrypt.hash(pwd, saltRounds, function(err, hash) {
        dbo.collection("users").findOne({username: user}, function(err, result) {
          if(result != null) {
            if(user === result.username) {
              bcrypt.compare(pwd, result.password, function(err, samePwd) {
                  if(samePwd == true) {
                    if(result.admin) {
                      response.send({message: "Success, admin"});
                    }
                    //successful login
                    else
                      response.send({message: "Success"});
                   
                  }
                  else {
                    response.send({message: "Wrong username/password"});
                    // unsuccessful login
                  }
              });
            }
          }
          else {
            response.send({message: "Wrong username/password"});
          }
        });
        client.close();
      });
  });
});

//Create new account
app.post('/api/createAcc', function(request, response) {
  let user = request.body.username;
  let pwd = request.body.password;
  let email = request.body.email;
  
  mongo.connect(url, function(err, client) {
    if (err) throw err;
    let dbo = client.db("project");
    dbo.collection("users").findOne({username: user}, function(err, result) {
      if(result != null) {
        response.send({message: "Username already exists"});
      }
      else {
        //Does not already exist, encrypt password and store new user
        bcrypt.hash(pwd, saltRounds, function(err, hash) {
          let data = {username: user, password: hash, email: email};
          dbo.collection("users").insertOne(data, function(err, result) {
            if (err) throw err;
            client.close();
            response.send({message: "Success"});
          });
        });
      }
    });
  });
});

app.get('/api/form', function(request, response) {
  
  mongo.connect(url, function(err, client) {
    if (err) throw err;
    let dbo = client.db("project");

    //Set headers for CORS
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let data = [];

    //Iterate through all returned forms and store data in array to be sent back
    dbo.collection("expenseReports").find({}).forEach(result => {
      if(result == null) {
        console.log("Couldn't find a form");
      }
      else {
        data.push({name: result.name, location: result.destination, date: result.travelDates, confirmed: result.confirmed});
      }
    }).then(function() {
      response.send(data);
    });
  });
});

app.put('/api/form', function(request, response) {
  mongo.connect(url, function(err, client) {
    if (err) throw err;
    let dbo = client.db("project");
    dbo.collection("expenseReports").updateOne({name: request.body.name, department: request.body.department,
                                              destination: request.body.destination, travelDates: request.body.travelDates,
                                              reason: request.body.reason, username: request.body.username}, {$set: {confirmed: true}}, 
      function(err, result) {
        if(err) throw err;
        if(result != null) {
          response.send("Report has been confirmed");
          dbo.collection("users").findOne({username: request.body.username}, function(err, userResult){
            if(err) throw err;
            else {
            var mailOptions = {
              from: 'UNATravelForm@gmail.com',
              to: userResult.email,
              subject: 'Travel Request Accepted',
              text: "Your travel request for " + request.body.destination + " has been accepted."
            };
            serverEmailAccount.sendMail(mailOptions, function(error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' +info.response);
              }
            });
          }
          });
          
        }
      });
});
});
app.delete('/api/form', function(request, response) {
  mongo.connect(url, function(err, client) {
    if (err) throw err;
    let dbo = client.db("project");
    dbo.collection("expenseReports").remove({name: request.body.name, department: request.body.department,
                                              destination: request.body.destination, travelDates: request.body.travelDates,
                                              reason: request.body.reason, username: request.body.username}, {justOne: true}, 
      function(err, result) {
        if(result != null) {
          response.send("Report has been deleted");
          dbo.collection("users").findOne({username: request.body.username}, function(err, userResult){
            if(err) throw err;
            else {
            var mailOptions = {
              from: 'UNATravelForm@gmail.com',
              to: userResult.email,
              subject: 'Travel Request Declined',
              text: "Your travel request for " + request.body.destination + " has been declined."
            };
            serverEmailAccount.sendMail(mailOptions, function(error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' +info.response);
              }
            });
          }
        });
        }
    });
});
});
app.post('/api/formDetail', function(request, response) {
  mongo.connect(url, function(err, client) {
    if (err) throw err;
    let dbo = client.db("project");

    //Set headers for CORS
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header("Access-Control-Allow-Methods", "POST, OPTIONS");
    let data = [];
    dbo.collection("expenseReports").findOne({name: request.body.name, travelDates: request.body.travelDates, 
            destination: request.body.destination}).then((result) => {
                response.send(result);
            }).catch((error) => {
              throw error;
            });
  });
});
  app.get('/', function(request, response) {
    console.log("Used default / instead of api/user");
    response.send("default err");
  });

  app.listen(8888);

}
