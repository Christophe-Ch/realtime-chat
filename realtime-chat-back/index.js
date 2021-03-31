const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
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

http.listen(3000, () => {
  console.log("listening on port 3000");
});
