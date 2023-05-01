const express = require("express");
const cookiePaser = require("cookie-parser");
const app = express();

app.set("port", process.env.PORT || 3000);
const connect = require("./schemas/");
const { authosRouter, postsRouter, commentsRouter } = require("./routes");
//const postsRouter = require("./routes/posts");

connect();

app.use(express.json());
app.use(cookiePaser());

//console.log("app.js");

app.use("/", [authosRouter]);
app.use("/posts", [postsRouter]);
app.use("/posts/:_postId/comments", [commentsRouter]);

app.use((error, req, res, next) => {
  console.error(error.stack);
  console.log("에러 발생 ");
  const status = error.status || 500;
  const message = error.message || "Internal 500 Error";
  res.status(status).json({ message: message });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
