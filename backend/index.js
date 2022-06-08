const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_channel", ({username,channel}) => {
    socket.join(channel);
    socket.join(username);
    console.log(`User with ID: ${username} joined channel: ${channel}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.channel).emit("receive_message", data);

    
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(5000, () => {
  console.log("SERVER RUNNING");
});