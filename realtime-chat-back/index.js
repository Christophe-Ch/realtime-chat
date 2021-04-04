const app = require("express")();
const server = app.listen(3000, () => {
  console.log("listening on port 3000");
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8080",
    credentials: true,
  },
});

// Middlewares
const middlewares = require("./middlewares");
middlewares.forEach((middleware) => io.use(middleware));

// Handlers
const handlers = require("./handlers/io");
handlers.forEach((handler) => handler(io));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
