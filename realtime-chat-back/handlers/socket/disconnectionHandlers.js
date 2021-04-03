const handlers = (socket, io) => {
  socket.on("disconnect", async () => {
    socket.broadcast.emit("user-disconnection", socket.username);
  });
};

module.exports = handlers;
