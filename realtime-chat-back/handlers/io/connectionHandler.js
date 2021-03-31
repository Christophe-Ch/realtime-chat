const handlers = require("../socket");

const onConnect = (io) => {
  io.on("connection", (socket) => {
    console.log(
      `${socket.user.username} connected (total: ${io.of("/").sockets.size})`
    );
    handlers.forEach((handler) => handler(socket, io));

    socket.emit("session", { session: socket.session, user: socket.user });

    socket.join(socket.user.userID);
    socket.leave(socket.id);
  });
};

module.exports = onConnect;
