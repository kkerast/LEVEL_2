1. [항해99 파트타임 1기]주특기 1주차 LEVEL_1


2. 프로젝트 정보
-# Node.js Lv.1
**Goal:  "Node.js와 express로 로그인 기능이 없는 나만의 항해 블로그 백엔드 서버 만들기"**

**Requirement: 과제에 요구되는 사항이에요.**

- `1) 서비스 완성`, `2) Directory Structure`,  `3) AWS 배포` 세 가지를 모두 완수해야 합니다.
    

    ✅ 서비스 완성
    
    1. 전체 게시글 목록 조회 API
        - 제목, 작성자명, 작성 날짜를 조회하기
        - 작성 날짜 기준으로 내림차순 정렬하기
    2. 게시글 작성 API
        - 제목, 작성자명, 비밀번호, 작성 내용을 입력하기
    3. 게시글 조회 API
        - 제목, 작성자명, 작성 날짜, 작성 내용을 조회하기 
        (검색 기능이 아닙니다. 간단한 게시글 조회만 구현해주세요.)
    4. 게시글 수정 API
        - API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 수정되게 하기
    5. 게시글 삭제 API
        - API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 삭제되게 하기
    6. 댓글 목록 조회
        - 조회하는 게시글에 작성된 모든 댓글을 목록 형식으로 볼 수 있도록 하기
        - 작성 날짜 기준으로 내림차순 정렬하기
    7. 댓글 작성
        - 댓글 내용을 비워둔 채 댓글 작성 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
        - 댓글 내용을 입력하고 댓글 작성 API를 호출한 경우 작성한 댓글을 추가하기
    8. 댓글 수정
        - 댓글 내용을 비워둔 채 댓글 수정 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
        - 댓글 내용을 입력하고 댓글 수정 API를 호출한 경우 작성한 댓글을 수정하기
    9. 댓글 삭제
        - 원하는 댓글을 삭제하기
    

    ✅ Directory Structure
    

    
    ```
    .
    ├── app.js
    ├── routes
    │   ├── index.js
    │   ├── comments.js
    │   └── posts.js
    └── schemas
        ├── index.js
        ├── comment.js
        └── post.js
    ```
    
    1. Directory Structure
        - 위와 같은 Directory Structure로 서비스를 구현하기
        - Middleware를 이용하여 Router를 분리해주세요.
    

    ✅ AWS 배포
   
    1. EC2 배포
        - Ubuntu EC2 를 구매한 뒤, Node.js의 포트(3000)를 80번 포트로 포워딩해서 포트 번호 없이도 서비스에 접속 가능하도록 하기
            
            → 수업시간에 배웠던 **iptable**을 사용하기
            
        - mongoDB를 EC2 내부에 설치해서 연결하기
        - 배포 후 ip 주소를 제출해주세요!
        

**Node 입문주차 과제 API**

|<p>![](Aspose.Words.4ce9c13d-a526-4a39-9696-bc65fbbd6bd0.001.png)</p><p>기능</p>|<p>![](Aspose.Words.4ce9c13d-a526-4a39-9696-bc65fbbd6bd0.002.png)</p><p>API URL</p>|<p>![](Aspose.Words.4ce9c13d-a526-4a39-9696-bc65fbbd6bd0.003.png)</p><p>Method</p>|<p>![](Aspose.Words.4ce9c13d-a526-4a39-9696-bc65fbbd6bd0.002.png)</p><p>request(가져 갈 데이터)</p>|<p>![](Aspose.Words.4ce9c13d-a526-4a39-9696-bc65fbbd6bd0.002.png)</p><p>response(서버로부터 받아올 데이터)</p>|<p>![](Aspose.Words.4ce9c13d-a526-4a39-9696-bc65fbbd6bd0.002.png)</p><p>Response(error)</p>|
| :- | :- | :- | :- | :- | :- |
|[게시글 작성](https://www.notion.so/b1ff12d063db4973bda87527c41ecdfb)|/posts|POST|{ "user": "Developer", "password": "1234", "title": "안녕하세요", "content": "안녕하세요 content 입니다." }|{ "message": "게시글을 생성하였습니다."}|# 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' }|
|[게시글 조회](https://www.notion.so/9f3bdf6821fd4f5a9fd51a40e565c3cf)|/posts|GET|-|{ "data": [ { "postId": "62d6d12cd88cadd496a9e54e", "user": "Developer", "title": "안녕하세요", "createdAt": "2022-07-19T15:43:40.266Z" }, { "postId": "62d6cc66e28b7aff02e82954", "user": "Developer", "title": "안녕하세요", "createdAt": "2022-07-19T15:23:18.433Z" } ] }||
|[게시글 상세 조회](https://www.notion.so/27e8c639c115457ba0f2682344aaa743)|/posts/:\_postId|GET|-|{ "data": { "postId": "62d6cb83bb5a517ef2eb83cb", "user": "Developer", "title": "안녕하세요", "content": "안녕하세요 content 입니다.", "createdAt": "2022-07-19T15:19:31.730Z" } }|# 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' }|
|[게시글 수정](https://www.notion.so/cdc9459edec64a17b89e9cd8112c3297)|/posts/:\_postId|PUT|{ "password": "1234", "title": "안녕하세요2", "content": "안녕하세요 content 입니다." }|{ "message": "게시글을 수정하였습니다."}|# 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' } # 404 \_postId에 해당하는 게시글이 존재하지 않을 경우 { message: '게시글 조회에 실패하였습니다.' }|
|[게시글 삭제](https://www.notion.so/5b32c1ab53464b398eb86ee10e8b8942)|/posts/:\_postId|DELETE|{ "password": "1234"}|{ "message": "게시글을 삭제하였습니다."}|# 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' } # 404 \_postId에 해당하는 게시글이 존재하지 않을 경우 { message: '게시글 조회에 실패하였습니다.' }|
|[댓글 생성](https://www.notion.so/2df2892199364cf494183b9f18faafbd)|/posts/:\_postId/comments|POST|{ "user": "Developer", "password": "1234", "content": "안녕하세요 댓글입니다." }|{ "message": "댓글을 생성하였습니다."}|# 400 body의 content를 입력받지 못한 경우 { message: '댓글 내용을 입력해주세요.' } # 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' }|
|[댓글 목록 조회](https://www.notion.so/8103f625015d4301942bdfbffadbc543)|/posts/:\_postId/comments|GET|-|{ "data": [ { "commentId": "62d6d3fd30b5ca5442641b94", "user": "Developer", "content": "수정된 댓글입니다.", "createdAt": "2022-07-19T15:55:41.490Z" }, { "commentId": "62d6d34b256e908fc79feaf8", "user": "Developer", "content": "안녕하세요 댓글입니다.", "createdAt": "2022-07-19T15:52:43.212Z" } ] }|# 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' }|
|[댓글 수정](https://www.notion.so/b441a210d4674c839661b6f6dd85355c)|/posts/:\_postId/comments/:\_commentId|PUT|{ "password": "1234", "content": "수정된 댓글입니다." }|{ "message": "댓글을 수정하였습니다."}|# 400 body의 content를 입력받지 못한 경우 { message: '댓글 내용을 입력해주세요.' } # 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' } # 404 \_commentId에 해당하는 댓글이 존재하지 않을 경우 { message: '댓글 조회에 실패하였습니다. }|
|[댓글 삭제](https://www.notion.so/356002c14a694df594f1215acbf9c70e)|/posts/:\_postId/comments/:\_commentId|DELETE|{ "password": "1234"}|{ "message": "댓글을 삭제하였습니다."}|# 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' } # 404 \_commentId에 해당하는 댓글이 존재하지 않을 경우 { message: '댓글 조회에 실패하였습니다. }|
|[게시글 작성](https://www.notion.so/687a9a51f57f4094b3a7057bcc307b52)|/posts|POST|{ "user": "Developer", "password": "1234", "title": "안녕하세요", "content": "안녕하세요 content 입니다." }|{ "message": "게시글을 생성하였습니다."}|# 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' }|
|[게시글 조회](https://www.notion.so/0e1639ef96a0468c98cc9ca83dd4e6b7)|/posts|GET|-|{ "data": [ { "postId": "62d6d12cd88cadd496a9e54e", "user": "Developer", "title": "안녕하세요", "createdAt": "2022-07-19T15:43:40.266Z" }, { "postId": "62d6cc66e28b7aff02e82954", "user": "Developer", "title": "안녕하세요", "createdAt": "2022-07-19T15:23:18.433Z" } ] }||
|[게시글 상세 조회](https://www.notion.so/8b6395c3898f4abbbe214f1bbe9fcddc)|/posts/:\_postId|GET|-|{ "data": { "postId": "62d6cb83bb5a517ef2eb83cb", "user": "Developer", "title": "안녕하세요", "content": "안녕하세요 content 입니다.", "createdAt": "2022-07-19T15:19:31.730Z" } }|# 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' }|
|[게시글 수정](https://www.notion.so/2a5cfdb2257b4bf88b37562a505d1c73)|/posts/:\_postId|PUT|{ "password": "1234", "title": "안녕하세요2", "content": "안녕하세요 content 입니다." }|{ "message": "게시글을 수정하였습니다."}|# 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' } # 404 \_postId에 해당하는 게시글이 존재하지 않을 경우 { message: '게시글 조회에 실패하였습니다.' }|
|[게시글 삭제](https://www.notion.so/44ef73560f694ceba15111ac0407e093)|/posts/:\_postId|DELETE|{ "password": "1234"}|{ "message": "게시글을 삭제하였습니다."}|# 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' } # 404 \_postId에 해당하는 게시글이 존재하지 않을 경우 { message: '게시글 조회에 실패하였습니다.' }|
|[댓글 생성](https://www.notion.so/23576b36e21b462fa95a4045b802a8c7)|/posts/:\_postId/comments|POST|{ "user": "Developer", "password": "1234", "content": "안녕하세요 댓글입니다." }|{ "message": "댓글을 생성하였습니다."}|# 400 body의 content를 입력받지 못한 경우 { message: '댓글 내용을 입력해주세요.' } # 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' }|
|[댓글 목록 조회](https://www.notion.so/978fb72667e641e08f1c2078b09be28f)|/posts/:\_postId/comments|GET|-|{ "data": [ { "commentId": "62d6d3fd30b5ca5442641b94", "user": "Developer", "content": "수정된 댓글입니다.", "createdAt": "2022-07-19T15:55:41.490Z" }, { "commentId": "62d6d34b256e908fc79feaf8", "user": "Developer", "content": "안녕하세요 댓글입니다.", "createdAt": "2022-07-19T15:52:43.212Z" } ] }|# 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' }|
|[댓글 수정](https://www.notion.so/c57b330f24184294b47290730834da0d)|/posts/:\_postId/comments/:\_commentId|PUT|{ "password": "1234", "content": "수정된 댓글입니다." }|{ "message": "댓글을 수정하였습니다."}|# 400 body의 content를 입력받지 못한 경우 { message: '댓글 내용을 입력해주세요.' } # 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' } # 404 \_commentId에 해당하는 댓글이 존재하지 않을 경우 { message: '댓글 조회에 실패하였습니다. }|
|[댓글 삭제](https://www.notion.so/0a8b9856ecbb4d3b8742615ef5ac9cff)|/posts/:\_postId/comments/:\_commentId|DELETE|{ "password": "1234"}|{ "message": "댓글을 삭제하였습니다."}|# 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' } # 404 \_commentId에 해당하는 댓글이 존재하지 않을 경우 { message: '댓글 조회에 실패하였습니다. }|





