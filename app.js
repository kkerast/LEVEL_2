const express = require("express");
const app = express();
app.set("port", process.env.PORT || 3000);
const connect = require("./schemas/");
const { postsRouter, commentsRouter } = require("./routes");
//const postsRouter = require("./routes/posts");

connect();

app.use(express.json());

app.use("/posts", [postsRouter]);
app.use("/posts/:_postId/comments", [commentsRouter]);

// app.use((req, res, next) => {
//   // 404 처리 부분
//   res.status(404).send(`<!DOCTYPE html>
//   <html lang="en">
//     <head>
//       <meta charset="utf-8">
//       <title>Error</title>
//     </head>
//     <body>
//       <pre>Cannot GET /</pre>
//     </body>
//   </html>`);
// });

// app.use(function(req, res, next) {
//   // error 생성 후 next
//   next(createError(404));
// });

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;

  res.status(status).send({ message: err.message });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
