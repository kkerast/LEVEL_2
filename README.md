# [항해99 파트타임 1기]주특기 2주차 LEVEL_2

-# Node.js Lv.2
**Goal: "회원가입, 로그인 기능이 추가된 나만의 항해 블로그 백엔드 서버 만들기"**

# 프로젝트 세팅

```
npm init
npm install express / npm i express
npm install mongoose
npm install jsonwebtoken
```

# AWS 세팅

## 0.AWS EC2 우분투 20.04

## 1.node js 설치

```
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 1-1 node 버전확인

```
node -v
```

## 2.mongo DB설치

```
sudo apt-get install gnupg
```

```
curl -fsSL https://pgp.mongodb.com/server-6.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg \
   --dearmor
```

```
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```

```
sudo apt-get update
```

```
sudo apt-get install -y mongodb-org
```

```
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-database hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-mongosh hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections
```

## 3. 80포트로 들어오는거 3000포트로 포트포워딩

```
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
```

## 4.mongo DB 실행

```
sudo systemctl start mongod
sudo systemctl daemon-reload
```

# **Requirement: 과제에 요구되는 사항이에요.**

1️⃣ 과제 요구 사항: 요구사항에 맞게 **API를 추가**해보세요!

1. 회원 가입 API

   - 닉네임, 비밀번호, 비밀번호 확인을 **request**에서 전달받기
   - 닉네임은 `최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)`로 구성하기
   - 비밀번호는 `최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패`로 만들기
   - 비밀번호 확인은 비밀번호와 정확하게 일치하기
   - 데이터베이스에 존재하는 닉네임을 입력한 채 회원가입 버튼을 누른 경우 "중복된 닉네임입니다." 라는 에러메세지를 **response**에 포함하기

2. 로그인 API
   - 닉네임, 비밀번호를 **request**에서 전달받기
   - 로그인 버튼을 누른 경우 닉네임과 비밀번호가 데이터베이스에 등록됐는지 확인한 뒤, 하나라도 맞지 않는 정보가 있다면 "닉네임 또는 패스워드를 확인해주세요."라는 에러 메세지를 **response**에 포함하기
   - 로그인 성공 시, 로그인에 성공한 유저의 정보를 JWT를 활용하여 클라이언트에게 Cookie로 전달하기

2️⃣ 과제 요구 사항: 요구사항에 맞게 **API를 수정**해보세요!
**변경된 요구사항은 하이라이트로 표시되어있습니다!**

1. 전체 게시글 목록 조회 API
   - 제목, 작성자명(**nickname**), 작성 날짜를 조회하기
   - 작성 날짜 기준으로 내림차순 정렬하기
2. 게시글 작성 API
   - **토큰을 검사하여, 유효한 토큰일 경우에만 게시글 작성 가능**
   - ~~제목, 작성자명, 비밀번호, 작성 내용을 입력하기~~
   - **제목, 작성 내용을 입력하기**
3. 게시글 조회 API
   - 제목, 작성자명(**nickname**), 작성 날짜, 작성 내용을 조회하기
     (검색 기능이 아닙니다. 간단한 게시글 조회만 구현해주세요.)
4. 게시글 수정 API
   - **토큰을 검사하여, 해당 사용자가 작성한 게시글만 수정 가능**
   - ~~API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 수정되게 하기~~
5. 게시글 삭제 API
   - **토큰을 검사하여, 해당 사용자가 작성한 게시글만 삭제 가능**
   - ~~API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 삭제되게 하기~~
6. 댓글 작성 API
   - **로그인 토큰을 검사하여, 유효한 토큰일 경우에만 댓글 작성 가능**
   - 댓글 내용을 비워둔 채 댓글 작성 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
   - 댓글 내용을 입력하고 댓글 작성 API를 호출한 경우 작성한 댓글을 추가하기
7. 댓글 수정 API
   - **로그인 토큰을 검사하여, 해당 사용자가 작성한 댓글만 수정 가능**
   - 댓글 내용을 비워둔 채 댓글 수정 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
   - 댓글 내용을 입력하고 댓글 수정 API를 호출한 경우 작성한 댓글을 수정하기
8. 댓글 삭제 API
   - **로그인 토큰을 검사하여, 해당 사용자가 작성한 댓글만 삭제 가능**
   - 원하는 댓글을 삭제하기

# **Node 입문주차 과제 API**
