import express from 'express';
// import socketIO from "socket.io";
const app = express();

export default (app, http) => {
  app.use(express.json());
  app.use(express.urlencoded({extended: true}))
  app.post('/api/user', function(request, response) {
    console.log(request.body);
    response.send(request.body);
    //Send data to a database
  });

  app.get('/', function(request, response) {
    console.log("Used default / instead of api/user");
    response.send("default err");
  })

  app.listen(8888);

}
