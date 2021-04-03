const storage = require("../../storage");

const handlers = (socket) => {
  socket.on("message", async ({ message, to }) => {
    socket.to(to).emit("message", {
      message,
      from: socket.user.userID,
    });

    storage.messages.insert({
      message,
      from: to,
      to: socket.user.userID,
    });
  });
};

module.exports = handlers;
