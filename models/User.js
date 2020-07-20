/** @format */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

//비밀번호 암호화  npm install bcrypt
//몽구스에서 가져온 메소드
userSchema.pre("save", function (next) {
  var user = this;
  //비밀번호를 바꿀때만 해쉬처리 해야해서 if 로 조건, 모델 필드중 password가 변환될때만 bcrypt사용
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err); //에러가 나면 index.js의 38로 보내버림
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash; //hash가 암호화된 비밀번호
        next();
      });
    });
  } else {
    //비밀번호를 바꾸는게 아니라 다른거 바꿀떄는 그냥 next 해줘야함, 아니면 위에서 머뭄
    next();
  }
});

userSchema.method.comparePassword = function (plainPassword, cb) {
  //plainPassword 1234567, 암호화된 비밀번호 $2b$10$nNI6z1gDSt4qi73Ki0Y7W.IlZDb/l/PXn6C
  //앞에 비밀번호를 해쉬화 해서 데이터 베이스에 있는 복잡한 문자, 해쉬 비밀번호랑 비교해야함
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    //비밀번호가 같지 않다. 콜백 cb(err)를 줌, 그리고 비밀번호가 비교후 같다. 에러 없고(null), isMatch가 true가 되고, indexjs 53으로
    if (err) return cb(err), cb(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);
//Schema를 모델로 감싸줘야함.

//다른곳에서도 쓸수 있게 export
module.exports = { User };
