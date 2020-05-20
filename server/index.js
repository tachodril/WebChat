const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 8000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("We have a new connection !!!");

  socket.on("join", ({ name, room }, callback) => {
    console.log(name, room);

    //const error = true;
    // if (error) {
    //   callback({ error: "error detected !" });
    // }
  });

  socket.on("disconnect", () => {
    console.log("User has left !!!");
  });
});

app.use(router);

server.listen(PORT, () =>
  console.log(`Server running fine !! on port ${PORT}`)
);
