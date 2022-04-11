const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

let connectedUsers = [];

const addUser = (username, socketId) => {
  !connectedUsers.some((user) => user.username === username) &&
    connectedUsers.push({
      username,
      socketId,
    });
};

const findUser = (username) => {
  return connectedUsers.find((user) => user.username === username);
};

const removeUser = (socketId) => {
  connectedUsers = connectedUsers.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log("A user connected");

  //take connected user's id
  socket.on("addUser", (username) => {
    console.log("user added");
    addUser(username, socket.id);
    socket.emit("getAllOnlineUsers", connectedUsers);
  });

  socket.on("sendMessage", (message) => {
    console.log("sent message");
    console.log(message);
    const user = findUser(message.receiver);
    console.log("user", user);
    console.log("users list", connectedUsers);
    if (user !== undefined) {
      io.to(user.socketId).emit("getMessage", message);
      console.log("sent message to receiver");
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    removeUser(socket.id);
    socket.emit("getAllOnlineUsers", connectedUsers);
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
