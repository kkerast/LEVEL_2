const express = require("express");
const authos_router = express.Router();
const Autho = require("../schemas/autho");

function error_message(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

authos_router.post("/signup", async (req, res, next) => {
  try {
    console.log("start signup");
    const { nickname, password, confirm } = req.body;
    //error.status = 412;
    if (nickname.length < 3 || nickname.length > 20) {
      //const error = new Error("닉네임의 형식이 일치하지 않습니다.");
      throw error_message(412, "닉네임의 형식이 일치하지 않습니다.");
    } else if (password !== confirm) {
      //const error = new Error("패스워드가 일치하지 않습니다.");
      throw error_message(412, "패스워드가 일치하지 않습니다.");
    } else if (password.length < 4 || password.length > 20) {
      //const error = new Error("패스워드 형식이 일치하지 않습니다.");
      throw error_message(412, "패스워드 형식이 일치하지 않습니다.");
      // } else if (String(password).find(nickname)) {
      //   //const error = new Error("패스워드에 닉네임이 포함되어 있습니다.");
      //   throw error_message(412, "패스워드에 닉네임이 포함되어 있습니다.");
    } else if (await Autho.findOne({ nickname: nickname })) {
      //const error = new Error("중복된 닉네임입니다.");
      throw error_message(412, "중복된 닉네임입니다.");
    } else if (req.body.empty) {
      //const error = new Error("요청한 데이터 형식이 올바르지 않습니다.");
      throw error_message(400, "요청한 데이터 형식이 올바르지 않습니다.");
    }

    const autho = new Autho({ nickname, password });

    await autho.save();

    return res.status(201).json({ message: "회원가입 성공" });
  } catch (error) {
    return next(error);
  }
});
authos_router.post("/login", async (req, res, next) => {
  try {
    const { nickname, password } = req.body;

    return res.status(200).json({ token: "로그인 성공" });
  } catch (error) {
    return next(error);
  }
});

module.exports = authos_router;
