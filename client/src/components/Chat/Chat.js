import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMsgs] = useState([]);
  const ENDPOINT = "localhost:8000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    //console.log(socket);

    socket.emit("join", { name, room }, () => {
      //alert(error);
    });

    //when unmount is called
    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("botmsg", (message) => {
      setMsgs(...messages, message);
    });
  }, [messages]);

  return <h1>Chat</h1>;
};

export default Chat;
