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
authoSchema.virtual("userID").get(function () {
  return this._id.toHexString(); // 이 부분의 this._id에 해당하는 부분을 가상화 시킨다.
});
authoSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Autho", authoSchema);
