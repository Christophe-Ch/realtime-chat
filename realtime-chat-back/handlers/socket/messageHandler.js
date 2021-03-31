const onMessage = (socket, io) => {
  socket.on("message", ({ message, to }) => {
    console.log(message);
    socket.to(to).emit("message", {
      message,
      from: socket.id,
    });
  });
};

module.exports = onMessage;
