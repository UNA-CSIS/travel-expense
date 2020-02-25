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
  // app.use(express.json());
  //
  // app.get('/foo', (req, res) => {
  //   res.json({msg: 'foo'});
  // });
  //
  // app.post('/bar', (req, res) => {
  //   res.json(req.body);
  // });
  // 
  // optional support for socket.io
  // 
  // let io = socketIO(http);
  // io.on("connection", client => {
  //   client.on("message", function(data) {
  //     // do something
  //   });
  //   client.emit("message", "Welcome");
  // });
}
