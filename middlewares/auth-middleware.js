const jwt = require("jsonwebtoken");
const Autho = require("../schemas/autho");

module.exports = async (req, res, next) => {
  console.log(req.cookies);
  const { Authorization } = req.cookies;
  //authorizaion 의 쿠키가 존재하지 않았을때를 대비

  console.log("middle - autho : ", Authorization);

  const [authyType, authToken] = (Authorization ?? "").split(" ");

  //authType === Bearer 값인지 확인
  //authToken  검증
  if (authyType !== "Bearer" || !authToken) {
    res.status(401).json({
      errorMessage: "로그인 후 사용하세요",
    });
    return;
  }

  try {
    console.log(jwt.verify(authToken, "secretOrPrivateKey"));
    const { nickname } = jwt.verify(authToken, "secretOrPrivateKey");
    console.log("userId :", nickname);
    const user = await Autho.findById(nickname);
    console.log(user);
    res.locals.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(403).send({
      errorMessage: "전달된 쿠키에서 오류가 발생하였습니다.",
    });
  }
};
