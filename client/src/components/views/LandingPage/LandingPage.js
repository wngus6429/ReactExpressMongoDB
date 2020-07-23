/** @format */

import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  //랜딩페이지 오자마자 밑에꺼 실행, axios.get으로 서버로 보내고
  //index.js 에서 정보를 타고  response로 옴
  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response.data));
  }, []);
  return <div>LandingPage 랜딩페이지</div>;
}

export default LandingPage;
