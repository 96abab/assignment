const express = require('express');
const request = require("request");
const app = express();

app.get('/weather', function(req, res){
    let day = req.query.day;
    let hour = req.query.hour;
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Content-Type", "application/JSON; carset=UTF-8");
    request.get({
       url: "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=y3igO1ZwlipiZaS1ao6Jc3pQiq8yXTrYxfzw6lsZkpMUE1h6ui86SK2Gnfu5P8MvD5ssg3pqXanFI18DuvmhBQ%3D%3D&pageNo=1&numOfRows=12&dataType=JSON&base_date=202212" + day + "&base_time=" + hour + "00&nx=61&ny=125" 
    }, (er, rep, body) => {
        res.send(body);
    })
})
app.listen(3000, () => console.log('고'));