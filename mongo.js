const dotenv = require("dotenv").config();

//initialise mongoose
const mongoose = require("mongoose");

//set variable containing cluster password
const password = process.env.MONGO_KEY;

//set variable for connection string
const url = `mongodb+srv://chreestian:${password}@cluster1.wtg5c.mongodb.net/phonebook?retryWrites=true&w=majority`;

//create schema for the data
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

//create the model,
//which is a class constructor for a document
const Person = mongoose.model("Person", personSchema);

// create mongodb connection
mongoose
  .connect(url)
  .then(() => {
    console.log("connected...");

    //instantiate documents
    const person = new Person({
      name: "Dummy2",
      number: "2",
    });

    return person.save();
  })
  .then(() => {
    console.log("person saved...");

    Person.find({}).then((persons) => {
      console.log("phonebook:");
      persons.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    });
  })
  .catch((err) => console.log(err));
