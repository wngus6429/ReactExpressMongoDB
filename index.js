/** @format */

const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

const config = require("./config/key");
const { User } = require("./models/User");

//bodyparser는 클라이언트에서 오는 정보를 서버에서 분석해서 가져올수있게 해줌
//application/x-www-form- 이런걸 분석해서 가져옴
app.use(bodyParser.urlencoded({ extended: true }));
//application/json 가져옴
app.use(bodyParser.json());

//mongoose는 MongoDb 연결 담당임, 뒤에 {useNew, Unified, useCre 등등 적어줘야 에러 안남}
//.then()은 앞에 부분이 실행이 끝나면 호출됨. catch로 에러 잡기
//////////////////////////////////////////////////////////////////////////////////////////////
const mongoose = require("mongoose");
mongoose
  .connect(config.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connect Success"))
  .catch((error) => console.log(error));
/////////////////////////////////////////////////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send("Hello World Park Juhyun さまd요요 씨발년아");
});

app.post("/register", (req, res) => {
  const user = new User(req.body);
  //이건 몽고DB에서 오는 메소드
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err }); //에러가 있으면 전달, 뒤에 err가 에러메세지 전달 내용
    return res.status(200).json({ success: true }); //status(200)이건 성공했다는 거임
  });
  //회원가입할때 필요한 정보들은 client에서 가져오면 그것들은 데이터베이스에 넣어준다.
});

app.listen(port, () => console.log(`Connection Success Click = ( http://localhost:${port} )`));
