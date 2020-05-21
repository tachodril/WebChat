const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

const PORT = process.env.PORT || 8000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  //console.log("We have a new connection !!!");

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit("botmsg", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });
    socket.broadcast
      .to(user.room)
      .emit("botmsg", { user: "admin", text: `${user.name}, has joined!` });

    socket.join(user.room);

    callback();
    //console.log(name, room);

    //const error = true;
    // if (error) {
    //   callback({ error: "error detected !" });
    // }
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("botmsg", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("User has left !!!");
  });
});

app.use(router);

server.listen(PORT, () =>
  console.log(`Server running fine !! on port ${PORT}`)
);
