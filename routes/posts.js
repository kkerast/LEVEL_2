const express = require("express");
const post_router = express.Router();
const Posts = require("../schemas/posts");
// post /posts : 게시글 생성 API
post_router.post("/posts", async (req, res) => {
  const { user, password, title, content } = req.body;
  const newPost = {
    user,
    password,
    title,
    content,
  };

  await Posts.create(newPost)
    .then((post) => {
      console.log("New post saved successfully!");
      console.log(post);
    })
    .catch((error) => {
      console.error(error);
    });

  // res.json({ message: "게시글을 생성하였습니다." });
  res.send({ message: "게시글을 생성하였습니다." });
});

// GET /posts : 게시글 조회 API
post_router.get("/posts", async (req, res) => {
  let posts = await Posts.find({}, { password: 0, __v: 0 });
  //const list = JSON.stringify(posts);

  res.json({ data: posts });
  //res.send("게시글 조회 API");
});

// GET /posts/:id : 게시글 상세조회 API
post_router.get("/posts/:id", async (req, res) => {
  console.log("req : ", req.params);
  const { id } = req.params;
  console.log("_id : ", id);

  const posts = await Posts.find({ _id: id }, { __v: 0 });
  // const list = JSON.stringify(posts);
  console.log(posts);

  res.json({ data: posts });

  //res.send("게시글 상세조회 API");
});

// PUT /posts/:id : 게시글 수정 API
post_router.put("/posts/:id", async (req, res) => {
  console.log("req : ", req.params);
  const { id } = req.params;
  console.log("_id : ", id);

  console.log(req.body);

  const { password, title, content } = req.body;
  console.log(password, title, content);

  // Post.updateOne({ _id: id, password: password }, { title, content })
  await Posts.updateOne({ _id: id }, { title: title, content: content });

  // const list = JSON.stringify(posts);
  // console.log(posts);

  // res.json({ data: posts });
  res.send("게시글 수정 API");
});

// DELETE /posts/:id : 게시글 삭제 API
post_router.delete("/posts/:id", async (req, res) => {
  console.log("req : ", req.params);
  const { id } = req.params;
  console.log("_id : ", id);

  const posts = await Posts.findByIdAndDelete(id);
  // const list = JSON.stringify(posts);
  console.log(posts);

  res.json({ data: posts });
  //res.send("게시글 삭제 API");
});

module.exports = post_router;
