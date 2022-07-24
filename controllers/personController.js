const personRouter = require("express").Router();
const Person = require("../models/person");

//@desc get phonebook statistics
//method: GET
//route: /info
personRouter.get("/info", (req, res) => {
  Person.find({})
    .then((persons) => {
      res.send(
        `<p> Phonebook has info for ${
          persons.length
        } people </p> <p> ${new Date()} </p>`
      );
    })
    .catch((err) => next(err));
});

//@desc get all contacts
//method: GET
//route: api/persons/
personRouter.get("/", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((err) => next(err));
});

//@desc get single contact
//method: GET
//route: api/persons/:id
personRouter.get("/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      //setting status to 400 because if a wrong
      //id is used, findById throws an error and
      //executes the catch block
      next(err);
    });
});

//@desc create contact
//method: POST
//route: /api/persons
personRouter.post("/", (req, res, next) => {
  if (!req.body.name || !req.body.number) {
    return res.status(400).json({
      error: "input name and number",
    });
  }

  Person.find({ name: req.body.name, number: req.body.number }).then(
    (person) => {
      if (person.length > 0) {
        res.status(400).json({
          error: "contact already saved",
        });
      } else {
        const newPerson = new Person({
          name: req.body.name,
          number: req.body.number,
        });

        newPerson
          .save()
          .then((savedPerson) => {
            res.json(savedPerson);
          })
          .catch((err) => next(err));
      }
    }
  );
});

//@desc update contact
//method: PUT
//route: /api/persons/:id
personRouter.put("/:id", (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    //the {new: true} is an optional parameter that
    //causes the event handler to be called with the new
    //modified document instead of the original
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((err) => next(err));
});

//@desc delete contact
//method: DELETE
//route: /api/persons/:id
personRouter.delete("/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

module.exports = personRouter;
