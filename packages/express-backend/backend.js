// backend.js
import express from "express";
import cors from "cors";


const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const addUser = (user) => {
  user.id = Math.random().toString(36).substring(2, 15);
  user = {
    id: user.id,
    name: user.name,
    job: user.job
  };
  users["users_list"].push(user);
  return user;
};

const deleteUser = (id) => {
    users["users_list"].pop(id);
    return id;
};


const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserByJob = (job) => {
  return users["users_list"].filter(
    (user) => user["job"] === job
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Meow!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );


app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        deleteUser(id);
        res.send("User has been deleted.");
    }
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined || job != undefined) {
    let result = findUserByJob(job);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201).send("User has been added! :D");
});

});
