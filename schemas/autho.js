const mongoose = require("mongoose");
const authoSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
    },
    password: {
      type: String,
    },

    createAt: {
      type: Date,
      default: Date.now,
      unique: true,
    },
  }
  //{ timestamps: true, _id: false }
);

module.exports = mongoose.model("Autho", authoSchema);
