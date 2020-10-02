var strollinServer = require("../bin/www")

const {
    UserModel
} = require("../models/user")
  
const {
    TagModel
} = require("../models/tag")
  

var sio = require('socket.io').listen(strollinServer.server)

sio.on("connection", socket => {

  // Event "connection"
  socket.on("connection", msg => {
    user = await UserModel.findOne({accessToken: msg.accessToken});
    response = {
      connected: false,
    };
    if (user) {
      response.connected = true;
      // join all room of conversation in his list
      sio.emit("connection", response);
    }
    sio.emit("connection", response);
  });

  // Event "sendMessage"
  socket.on("sendMessage", msg => {
    console.log(msg);
    sio.emit("chat message", msg);
  });

})

exports.sio = sio;