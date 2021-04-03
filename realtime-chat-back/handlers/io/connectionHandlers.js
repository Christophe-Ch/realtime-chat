const socketHandlers = require("../socket");
const storage = require("../../storage");

const handlers = (io) => {
  io.on("connection", async (socket) => {
    console.log(
      `${socket.user.username} connected (total: ${io.of("/").sockets.size})`
    );
    socketHandlers.forEach((handler) => handler(socket, io));

    const messages = await storage.messages
      .getAll({
        $or: [
          {
            from: socket.user.userID,
          },
          {
            to: socket.user.userID,
          },
        ],
      })
      .toArray();

    const conversations = {};
    messages.forEach((message) => {
      const target =
        message.from === socket.user.userID ? message.to : message.from;

      if (!conversations[target]) {
        conversations[target] = [];
      }

      conversations[target].push(message);
    });

    socket.emit("session", { session: socket.session, user: socket.user });
    socket.emit(
      "users",
      (await storage.users.getAll({}).toArray()).map((user) => {
        return {
          userID: user.userID,
          username: user.username,
          conversation: conversations[user.userID],
        };
      })
    );

    socket.join(socket.user.userID);
    socket.leave(socket.id);
  });
};

module.exports = handlers;
