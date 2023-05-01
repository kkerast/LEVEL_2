const express = require("express");
const JWT = require("jsonwebtoken");
const authos_router = express.Router();
const Autho = require("../schemas/autho");
const middleWare = require("../middlewares/auth-middleware");

function error_message(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

//회원가입 API
authos_router.post("/signup", async (req, res, next) => {
  try {
    console.log("start signup");
    const { nickname, password, confirm } = req.body;

    console.log(Autho);

    //error.status = 412;
    const regex_nickname = /^[a-zA-Z0-9]{3,}$/; // 정규식
    // ^: 문자열의 시작을 의미합니다.
    // [a-zA-Z0-9]: 알파벳 대소문자와 숫자를 의미합니다.
    // {3,}: 앞의 문자나 문자열이 3번 이상 반복되는 것을 의미합니다.
    // $: 문자열의 끝을 의미합니다.
    const regex_password = new RegExp(
      "^(?!.*" + nickname + ").*[a-zA-Z0-9]{4,}$"
    );
    // ^: 문자열의 시작을 의미합니다.
    // (?!.*nickname): "nickname" 문자열이 포함되지 않도록 합니다. ?!는 negative lookahead로서, 괄호 안의 패턴이 문자열에 존재하지 않을 때 매치합니다. .*는 0개 이상의 어떤 문자열을 의미합니다.
    // .*: 0개 이상의 어떤 문자열을 의미합니다.
    // [a-zA-Z0-9]{4,}: 알파벳 대소문자와 숫자로 이루어진 4자 이상의 문자열과 매치됩니다.
    // $: 문자열의 끝을 의미합니다.
    if (!regex_nickname.test(nickname)) {
      //const error = new Error("닉네임의 형식이 일치하지 않습니다.");
      throw error_message(412, "닉네임의 형식이 일치하지 않습니다.");
    } else if (password !== confirm) {
      //const error = new Error("패스워드가 일치하지 않습니다.");
      throw error_message(412, "패스워드가 일치하지 않습니다.");
    } else if (password.length < 4) {
      //const error = new Error("패스워드 형식이 일치하지 않습니다.");
      throw error_message(412, "패스워드 형식이 일치하지 않습니다.");
    } else if (!regex_password.test(password)) {
      //const error = new Error("패스워드에 닉네임이 포함되어 있습니다.");
      throw error_message(412, "패스워드에 닉네임이 포함되어 있습니다.");
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

//로그인 API
authos_router.post("/login", async (req, res, next) => {
  try {
    const { nickname, password } = req.body;
    // # 412 해당하는 유저가 존재하지 않는 경우
    // {"errorMessage": "닉네임 또는 패스워드를 확인해주세요."}
    // # 400 예외 케이스에서 처리하지 못한 에러
    // {"errorMessage": "로그인에 실패하였습니다."}
    const user = await Autho.findOne({
      nickname: nickname,
      password: password,
    }).exec();

    console.log(user.nickname);

    if (!user || password !== user.password) {
      throw error_message(412, "닉네임 또는 패스워드를 확인해주세요.");
    } else {
      // 사용자 정보를 JWT로 생성

      const token = await JWT.sign(
        { nickname: user.id }, // user 변수의 데이터를 payload에 할당
        "secretOrPrivateKey", // JWT의 비밀키를 secretOrPrivateKey라는 문자열로 할당
        { expiresIn: "1h" } // JWT의 인증 만료시간을 1시간으로 설정);
      );
      res.cookie("Authorization", `Bearer ${token}`); // JWT를 Cookie로 할당합니다!
      console.log(token);
      res.status(200).json({ token: token }); // JWT를 Body로 할당합니다!
    }
  } catch (error) {
    return next(error);
  }
});

// 내 정보 조회 API
authos_router.get("/users/me", middleWare, async (req, res) => {
  console.log("start users/me");
  //console.log(res.locals);
  const { nickname, id } = res.locals.user;

  res.status(200).json({
    user: { nickname, id },
  });
});

module.exports = authos_router;
