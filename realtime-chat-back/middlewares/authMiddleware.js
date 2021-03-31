const { v4: uuidv4 } = require("uuid");
const storage = require("../storage");

const authMiddleware = async (socket, next) => {
  let sessionID = socket.handshake.auth.sessionID;

  if (sessionID) {
    const session = await storage.sessions.get({ sessionID });
    if (session) {
      socket.session = session;
      socket.user = await storage.users.get({ userID: session.userID });

      return next();
    }
  }

  const username = socket.handshake.auth.username;

  if (!username) {
    return next(new Error("No username provided"));
  }

  sessionID = uuidv4();
  while (!isSessionUnique(sessionID)) {
    sessionID = uuidv4();
  }

  let userID = uuidv4();
  while (!isUserUnique(userID)) {
    userID = uuidv4();
  }

  socket.session = {
    sessionID,
    userID,
  };

  socket.user = {
    userID,
    username,
  };

  storage.sessions.insert(socket.session);
  storage.users.insert(socket.user);

  next();
};

const isSessionUnique = async (sessionID) => {
  return (await storage.sessions.get({ sessionID })) === null;
};

const isUserUnique = async (userID) => {
  return (await storage.users.get({ userID })) === null;
};

module.exports = authMiddleware;
