/** @format */

const express = require("express");
const app = express();
const port = 5000;

//mongoose는 MongoDb 연결 담당임, 뒤에 {useNew, Unified, useCre 등등 적어줘야 에러 안남}
//.then()은 앞에 부분이 실행이 끝나면 호출됨. catch로 에러 잡기
//////////////////////////////////////////////////////////////////////////////////////////////
const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://wngus6429:tnrwk2499@reactserver.ulh9l.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connect Success"))
  .catch((error) => console.log(error));
/////////////////////////////////////////////////////////////////////////////////////////////

app.get("/", function (req, res) {
  res.send("Hello World Park Juhyun さま");
});

app.listen(port, () => console.log(`😍 Connection Success Click = ( http://localhost:${port} )`));
