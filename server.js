const app = require("./app");
const http = require("http");
const socketIo = require("socket.io");

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONT_END_API || "http://localhost:3000",
    method: ["POST", "GET"],
  },
});

let privateChats = new Map();

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("welcome", { message: "Welcome to chat" });

  socket.on("join room", (data) => {
    console.log("🚀 ~ file: server.js:22 ~ socket.on ~ data:", data)
    console.log(" someone joined to room; " + data.roomId);
    if (!privateChats.has(data.roomId)) {
      privateChats.set(data.roomId, [data.userId]);
    } else {
      const users = privateChats.get(data.roomId);
      if (!users.includes(data.userId)) {
        users.push(data.userId);
        privateChats.set(data.roomId, users);
      }
    }
    socket.join(data.roomId);
  });

  socket.on("message", (data) => {
    if (privateChats.get(data.roomId).includes(data.userId)) {
      io.to(data.roomId).emit("new message", data.message);
    }
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
