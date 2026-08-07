const mongoose = require("mongoose")

const studentScema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
  
  
    lastName: {
      type: String,
      require: true,
    },

    age: {
      type: String,
    },
    studentClass: {
      type: String,
    },

    rollNumber: {
      type: String,
    },
  },
);

const  Student = mongoose.model("student", studentScema)

module.exports = Student