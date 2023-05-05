const express = require("express");
const post_router = express.Router();
const Posts = require("../schemas/post");
const middleWare = require("../middlewares/auth-middleware");

function error_message(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

async function authExists(_Id, userId) {
  const authId = await Posts.findOne({ _id: _Id }, { userId: 1 });
  if (authId.userId !== userId) {
    return false;
  } else {
    return true;
  }
}

// GET /posts : 게시글 조회 API
post_router.get("/", async (req, res, next) => {
  try {
    let posts = await Posts.find({}, { password: 0, content: 0, __v: 0 }).sort({
      createdAt: -1,
    });
    //const list = JSON.stringify(posts);

    res.json({ posts: posts });
    //res.send("게시글 조회 API");
  } catch (error) {
    return next(error_message(400, "게시글 조회에 실패하였습니다."));
  }
});

// post /posts : 게시글 작성 API
post_router.post("/", middleWare, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { nickname, id } = res.locals.user;
    if (!title) {
      throw error_message(412, "게시글 제목의 형식이 일치하지 않습니다.");
    } else if (!content) {
      throw error_message(412, "게시글 내용의 형식이 일치하지 않습니다.");
    }
    await Posts.create({
      userId: id,
      nickname: nickname,
      title: title,
      content: content,
    });
    res.status(201).json({ message: "게시글을 생성하였습니다." });
  } catch (error) {
    console.log(error);
    const status = error.status || 400; // error.status = 400;
    const message = error.message || "게시글 작성에 실패하였습니다.";
    return next(error_message(status, message));
  }

  // res.json({ message: "게시글을 생성하였습니다." });
  // res.send({ message: "게시글을 생성하였습니다." });
});

// GET /posts/:id : 게시글 상세조회 API
post_router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const posts = await Posts.findOne({ _id: id }, { __v: 0 });
    if (posts === null) {
      throw new Error("데이터 형식이 올바르지 않습니다.");
    }
    res.json({ post: posts });
  } catch (error) {
    return next(error_message(400, "게시글 조회에 실패하였습니다."));
  }
});

// PUT /posts/:id : 게시글 수정 API
post_router.put("/:id", middleWare, async (req, res, next) => {
  try {
    console.log("req : ", req.params);
    const { id } = req.params;
    console.log("_id : ", id);

    console.log(req.body);

    const { title, content } = req.body;
    //const { nickname, id } = res.locals.user;
    const userId = res.locals.user.id;
    console.log(title, content);

    if (!title) {
      throw error_message(412, "게시글 제목의 형식이 일치하지 않습니다.");
    } else if (!content) {
      throw error_message(412, "게시글 내용의 형식이 일치하지 않습니다.");
    }

    // Post.updateOne({ _id: id, password: password }, { title, content })
    // const authoId = await Posts.findOne({ _id: id }, { userId: 1 });
    // console.log("autho1 : ", authoId);
    // console.log("autho2 : ", authoId.userId);
    // console.log("autho3 : ", userId);

    if (authExists(id, userId)) {
      throw error_message(403, "게시글 수정의 권한이 존재하지 않습니다.");
    }

    const posts = await Posts.updateOne(
      { _id: id, userId: userId },
      { title: title, content: content, updatedAt: Date.now() }
    );

    // const list = JSON.stringify(posts);
    console.log(posts);
    // res.json({ data: posts });
    if (posts.modifiedCount) {
      res.send("댓글을 수정하였습니다.");
    } else {
      throw error_message(401, "게시글이 정상적으로 수정되지 않았습니다.");
    }
  } catch (error) {
    const status = error.status || 400; // error.status = 400;
    const message = error.message || "게시글 수정에 실패하였습니다.";
    return next(error_message(status, message));
  }
});

// DELETE /posts/:id : 게시글 삭제 API
post_router.delete("/:id", middleWare, async (req, res, next) => {
  try {
    console.log("req : ", req.params);
    console.log("body : ", req.body);
    const { id } = req.params;
    //const { password } = req.body;
    const userId = res.locals.user.id;

    console.log("_id : ", id);
    //console.log("password : ", password);
    if (authExists(id, userId)) {
      throw error_message(403, "게시글 삭제의 권한이 존재하지 않습니다.");
    }
    const posts = await Posts.deleteOne({ _id: id, userId: userId });
    // const list = JSON.stringify(posts);
    console.log(posts);
    if (posts.deletedCount === 0) {
      //throw new Error("게시글 조회에 실패하였습니다.").status(404);
      throw error_message(404, "게시글이 존재하지 않습니다.");
    }

    //else {
    //   res.json({ message: "게시글을 삭제하였습니다." });
    // }
    res.json({ message: "게시글을 삭제하였습니다." });
  } catch (error) {
    const status = error.status || 400; // error.status = 400;
    const message = error.message || "게시글 삭제에 실패하였습니다.";
    return next(error_message(status, message));
  }

  //res.send("게시글 삭제 API");
});

module.exports = post_router;
