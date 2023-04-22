const express = require("express");
const app = express();
app.set("port", process.env.PORT || 3000);
const connect = require("./schemas/");
const postsRouter = require("./routes/posts.js");

connect();

app.use(express.json());

app.use("/api", [postsRouter]);

app.use((req, res, next) => {
  // 404 처리 부분
  res.status(404).send(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Error</title>
    </head>
    <body>
      <pre>Cannot GET /</pre>
    </body>
  </html>`);
});

app.use((err, req, res, next) => {
  // 에러 처리 부분
  console.error(err.stack); // 에러 메시지 표시
  res.status(500).send("서버 에러!"); // 500 상태 표시 후 에러 메시지 전송
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
