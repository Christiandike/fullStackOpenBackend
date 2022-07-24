const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, "Name is required"],
  },
  number: {
    type: String,
    validate: {
      validator: /\d{3}-\d{8}/,
      msg: "valid format is xx-xxxxxxx or xxx-xxxxxxxx",
    },
    validate: {
      validator: /\d{2}-\d{7}/,
      msg: "valid format is xx-xxxxxxx or xxx-xxxxxxxx",
    },
  },
});

//format the default ids set by mongoDB to strings
personSchema.set("toJSON", {
  transform: (document, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
