/* 
 * Travel Expense System
 * Created by: Joshua Borden, Antonio Lemus, Jacob Morris, Bryan Risher
 * University of North Alabama, Spring 2020
 * 
 * index.js implements the RESTful API. Handles all requests
 * from the Vue website and returns any needed data. Communicates
 * with a MongoDB database where forms and user information are stored
 */

const bcrypt = require('bcrypt');
const cors = require('cors');
const express = require ('express');
const mongo = require('mongodb').MongoClient;
const mongoConstruct = require('mongodb');
const nodemailer = require('nodemailer');

const deptChairEmail = "jmorris0899@yahoo.com"
const saltRounds = 10;
const app = express();
const url='mongodb://localhost:27017/';
const homepage = "http://localhost:8080";
const login = "http://localhost:8080/login";

/* 
 * Server's email information. This is the email account
 * that request statuses are sent from
*/
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

  /*
   * Handle for user submitting their completed form
   * Takes all receieved data, stores it into a new document
   * on the database, and emails the user that the form has been receieved
  */
  //May change to /api/form
  app.post('/api/user', function(request, response) {
    let data = request.body;
    data['confirmed'] = false;

    //Connect to database and store data
    mongo.connect(url, function(err, client) {
      if (err) throw err;
      else {
        let dbo = client.db("project");
        //Insert new form
        dbo.collection("expenseReports").insertOne(data, function(err, response) {
          if (err) 
            throw err;
          else
            client.close();
      });

      var mailOptions = {
        from: 'UNATravelForm@gmail.com',
        to: deptChairEmail,
        subject: 'New Travel Request Submitted',
        text: "A new travel request form has been submitted by " + request.body.name
      };

      //Send email to dept. chair that a form has been submitted
      serverEmailAccount.sendMail(mailOptions, function(error, info) {
        if (error) 
          console.log(error);
         else 
          console.log('Email sent: ' + info.response);
      });

      //Lookup user's email and notify them that their form has been received
      dbo.collection("users").findOne({username: data.username}, function(err, result) {
        if(err) 
          throw err;
        else {
          if(result != null) {

            var mailOptions = {
              from: 'UNATravelForm@gmail.com',
              to: result.email,
              subject: 'Travel Request Submitted',
              text: "Your travel request form has been submitted. You will be emailed again when it is confirmed/denied"
            };

            serverEmailAccount.sendMail(mailOptions, function(error, info) {
              if (error) 
                console.log(error);
              else 
              console.log('Email sent: ' + info.response);
            });
          }
        }
      });
    }
    });
    response.redirect(homepage);
  });
    
  /*
   * Handle for user login requests. Passwords are encrypted
  */
  //User login
  app.post('/api/login', function(request, response) {
      
    let user = request.body.username;
    let pwd = request.body.password;
    if(typeof user != `string` || typeof pwd != `string`) {
      response.send({message: "Wrong username/password"});
    }

    else {
      mongo.connect(url, function(err, client) {
      if (err) 
        throw err;
      else {
        let dbo = client.db("project");
        bcrypt.hash(pwd, saltRounds, function(err, hash) {
          dbo.collection("users").findOne({username: user}, function(err, result) {
            if(result != null) {
              if(user === result.username) {
                bcrypt.compare(pwd, result.password, function(err, samePwd) {
                  if(samePwd == true) {
                    //successful admin login
                    if(result.admin) 
                      response.send({message: "Success, admin"});

                    //successful login
                    else
                      response.send({message: "Success"});
                  }
                  //Unsuccessful login
                  else 
                    response.send({message: "Wrong username/password"});
                });
              }
            }
            //Unsuccessful login
            else 
              response.send({message: "Wrong username/password"});
          });
          client.close();
        });
      }
      });
    }
});

//Create new account
app.post('/api/createAcc', function(request, response) {
  let user = request.body.username;
  let pwd = request.body.password;
  let email = request.body.email;

  if(typeof user != `string` || typeof pwd != `string` || typeof email != `string`) 
    response.send({message: "Wrong username/password"}); 

  else {
    mongo.connect(url, function(err, client) {

    if (err) 
      throw err;

    else {
      let dbo = client.db("project");
      dbo.collection("users").findOne({username: user}, function(err, result) {
        if(result != null) 
          response.send({message: "Username already exists"}); 
        else {

          //Does not already exist, encrypt password and store new user
          bcrypt.hash(pwd, saltRounds, function(err, hash) {
            let data = {username: user, password: hash, email: email};
            dbo.collection("users").insertOne(data, function(err, result) {
              if (err) 
                throw err;
              else {
                client.close();
                response.send({message: "Success"});
              }
            });

          });
        }
      });
    }
    });
  }
});

// Return summary of all forms
app.get('/api/form', function(request, response) {
  
  mongo.connect(url, function(err, client) {
    if (err) 
      throw err;
    else {
      let dbo = client.db("project");
      let data = [];

      //Iterate through all returned forms and store data in array to be sent back
      dbo.collection("expenseReports").find({}).forEach(result => {
        if(result == null) 
          console.log("Couldn't find a form");
        else 
          data.push({name: result.name, location: result.destination, date: 
            result.travelDates, confirmed: result.confirmed, _id: result._id});
      }).then(function() {
        response.send(data);
      });
    }
  });
});

// Handle confirming forms from dept. chair
app.put('/api/form', function(request, response) {
  mongo.connect(url, function(err, client) {
    if (err) 
      throw err;
    else {
      let dbo = client.db("project");
      dbo.collection("expenseReports").updateOne({name: request.body.name, department: request.body.department,
                                              destination: request.body.destination, travelDates: request.body.travelDates,
                                              reason: request.body.reason, username: request.body.username}, {$set: {confirmed: true}}, 
      function(err, result) {
        if(err) 
          throw err;
        else {
          if(result != null) {
            response.send("Report has been confirmed");
            dbo.collection("users").findOne({username: request.body.username}, function(err, userResult){
              if(err) 
                throw err;
              else {
                var mailOptions = {
                  from: 'UNATravelForm@gmail.com',
                  to: userResult.email,
                  subject: 'Travel Request Accepted',
                  text: "Your travel request for " + request.body.destination + " has been accepted."
                };
                serverEmailAccount.sendMail(mailOptions, function(error, info) {
                  if (error) 
                    console.log(error);
                  else 
                    console.log('Email sent: ' +info.response);
                });
              }
            });
          }
        }
      });
    }
  });
});

// Handle declining forms
app.delete('/api/form', function(request, response) {
  mongo.connect(url, function(err, client) {
    if (err) 
      throw err;
    else {
      let dbo = client.db("project");
      dbo.collection("expenseReports").remove({name: request.body.name, department: request.body.department,
                                              destination: request.body.destination, travelDates: request.body.travelDates,
                                              reason: request.body.reason, username: request.body.username}, {justOne: true}, 
      function(err, result) {
        if(result != null) {
          response.send("Report has been deleted");
          dbo.collection("users").findOne({username: request.body.username}, function(err, userResult){
            if(err) 
              throw err;
            else {
              var mailOptions = {
                from: 'UNATravelForm@gmail.com',
                to: userResult.email,
                subject: 'Travel Request Declined',
                text: "Your travel request for " + request.body.destination + " has been declined. \nReason: " + request.body.reasonForDenial
              };
              serverEmailAccount.sendMail(mailOptions, function(error, info) {
              if (error) 
                console.log(error);
              else 
                console.log('Email sent: ' +info.response);
              
              });
            }
          });
        }
      });
    }
  });
});

// Get details about a selected form
app.post('/api/formDetail', function(request, response) {
  mongo.connect(url, function(err, client) {
    if (err) 
      throw err;
    else {
      let dbo = client.db("project");
      var o_id = new mongoConstruct.ObjectID(request.body.id);
      dbo.collection("expenseReports").findOne({"_id": o_id}).then((result) => {
        response.send(result);
      }).catch((error) => {
        throw error;
      });
    }
  });
});

app.listen(8888);

}
