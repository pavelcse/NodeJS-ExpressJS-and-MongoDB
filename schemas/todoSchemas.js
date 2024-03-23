const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

// custom method
todoSchema.method({
  findActive: function () {
    return mongoose.model("Todo").find({ status: "active" });
  },
});

//custom static method
todoSchema.static({
  findByJS: function () {
    return this.find({ title: /js/i });
  },
});

//custom query helper
todoSchema.query = {
  byLanguage: function (language) {
    return this.find({ title: new RegExp(language, "i") });
  },
};

module.exports = todoSchema;
