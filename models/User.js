/** @format */

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //trim은 space 공간을 없애주는 역할을 함. s p
    unique: 1, //똑같은 이메일 못 적게 유니크
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0, //아무것도 안하면 0을 줌
  }, //어떤 유저가 관리자가 되는지, 일반 유저가 되는지
  image: String,
  token: { type: String },
  tokenExp: { type: Number }, //토큰 유효기한
});

const User = mongoose.model("User", userSchema);
//Schema를 모델로 감싸줘야함.

//다른곳에서도 쓸수 있게 export
module.export = { User };
