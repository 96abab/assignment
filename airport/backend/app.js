const port = 3000;
const request = require("request"); // Http 요청을 다루는 라이브러리 로딩하기
// const bodypa = require("body-parser")

const { default: axios } = require('axios');
// const { request } = require('express');
// expless 라이브러리 로딩하기
var express = require('express');
const { application } = require("express");
const { urlencoded } = require("body-parser");

// express()를 호출하여 웹서버를 준비한다
var app = express();

app.get('/airport', // 요청 받는 URL
  (req, res) => {
  res.set("Access-Control-Allow-Origin", "*") // 모든 대상에게 접속을 허용
  res.set("Content-Type", "text/javascript; charset=UTF8")

  request.get({
    url: "http://apis.data.go.kr/B551177/PassengerNoticeKR/getfPassengerNoticeIKR?serviceKey=y3igO1ZwlipiZaS1ao6Jc3pQiq8yXTrYxfzw6lsZkpMUE1h6ui86SK2Gnfu5P8MvD5ssg3pqXanFI18DuvmhBQ%3D%3D&selectdate=" + 1 + "&type=json",
    } , (error, respon, body) => {
    str = body;
    res.send(str);
  });
})

// 웹 서버 실행하기
app.listen(port, () => {
  console.log(`${port} 번 포트로 개방됨`) // 서버가 실행될 경우 호출 될 함수
})
console.log('서버 시작')