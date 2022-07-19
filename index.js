const express = require("express");
const morgan = require("morgan");
const app = express();

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  {
    id: 5,
    name: "dummy5",
  },
  {
    id: 6,
    name: "dummy6",
  },
  {
    id: 7,
    name: "dummy7",
  },
];

morgan.token(
  "body",
  (getBody = (req) => {
    return JSON.stringify(req.body);
  })
);

const getID = () => {
  return Math.floor(Math.random() * 934215087);
};

app.use(express.json());

app.use(
  morgan(":method :url :status :res[content-length] :body - :response-time ms")
);

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(
    `<p> Phonebook has info for ${persons.length} people </p> <p> ${new Date()} </p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = +req.params.id;
  const person = persons.find((p) => p.id === id);

  if (!person) {
    return res.status(404).end();
  }

  res.json(person);
});

app.post("/api/persons", (req, res) => {
  const exists = persons.some((p) => p.name === req.body.name);

  if (exists) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  if (!req.body.name || !req.body.number) {
    return res.status(400).json({
      error: "No name and number",
    });
  }

  const person = {
    id: getID(),
    name: req.body.name,
    number: req.body.number,
  };

  persons = persons.concat(person);

  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = +req.params.id;
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

const PORT = 3001;

app.listen(PORT, () => {
  `Server running on port ${PORT}`;
});
