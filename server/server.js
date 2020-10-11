const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const fetch = require("node-fetch");
const MongoClient = require("mongodb").MongoClient;

let dbConfig = require("./config");
let { dbName, collectionName, user, password } = dbConfig;
const url = `mongodb+srv://${user}:${password}@cluster0.uiis0.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const API = "https://randomuser.me/api/?results=10";

server.use(middlewares);
server.use(jsonServer.bodyParser);

let DB;
let client;

MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, cli) {
    if (err) {
      throw err;
    } else {
      client = cli;
      DB = client.db(dbName);
      console.log("Connected to db!");
    }
  }
);

server.put("/users/:uuid", (req, res) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    country,
    username,
    password,
  } = req.body;
  DB.collection(collectionName).update(
    { "login.uuid": req.params.uuid },
    {
      $set: {
        "name.first": firstName,
        "name.last": lastName,
        phone: phone,
        email: email,
        "location.country": country,
        "login.username": username,
        "login.password": password,
      },
    },
    function () {
      res.send(req.body);
    }
  );
});

server.delete("/users/:uuid", (req, res) => {
  DB.collection(collectionName).deleteOne(
    { "login.uuid": req.params.uuid },
    function () {
      res.send(true);
    }
  );
});

server.get("/users", (req, res) => {
  DB.collection(collectionName).countDocuments(function (err, count) {
    if (err) throw err;
    if (count === 0) {
      fetch(API)
        .then((res) => res.json())
        .then((response) => {
          DB.collection(collectionName).insertMany(response.results, function (
            err
          ) {
            if (err) throw err;
            client.db.close();
          });
        });
    }
  });

  DB.collection(collectionName)
    .find({})
    .toArray(function (err, data) {
      if (!err) {
        res.status(200);
        res.set("Content-Type", "application/json");
        return res.send(data);
      }
      res.set("Content-Type", "application/json");
      res.send(err);
      client.db.close();
    });
});

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running");
});
