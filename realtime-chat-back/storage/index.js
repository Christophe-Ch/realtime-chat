const { MongoClient, Server } = require("mongodb");

class Storage {
  constructor() {
    this.client = new MongoClient("mongodb://localhost:27017", {
      useUnifiedTopology: true,
    });
    this.client.connect((err) => {
      if (err) throw new Error(err.message);
    });

    this.db = this.client.db("realtime-chat");

    this.sessions = new CollectionHandler(this.db.collection("sessions"));
    this.users = new CollectionHandler(this.db.collection("users"));
    this.messages = new CollectionHandler(this.db.collection("messages"));
  }
}

class CollectionHandler {
  constructor(collection) {
    this.collection = collection;
  }

  get(options) {
    return this.collection.findOne(options);
  }

  getAll(options = {}) {
    return this.collection.find(options);
  }

  insert(...documents) {
    this.collection.insertMany(documents);
  }
}

module.exports = new Storage();
