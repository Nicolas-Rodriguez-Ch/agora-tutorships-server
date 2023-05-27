const app = require("./app");
const http = require("http");
const socketIo = require("socket.io");

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["POST", "GET"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
