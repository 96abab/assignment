let hour = 0;
let min = 0;
let sec = 0;
let year = 0;
let month = 0;
let day = 0;

var i;

setTimeout(bitweather, 50); // 웹 브라우저 실행후 0.05 초 뒤에 예보 초기화 함수 실행 주소//역삼동
// 0.05초의 단격을 둔 이유는 (당일, 현재시간) 을 호출하는 onload 함수가 실행될 여유시간이 조금 이나마 필요하다.

function bitweather() {

  // hour = 23; // 24시가 넘어가서 일과 시간이 초기화 되면서 오류가 발생하여 임시로 입력함
  // day = 16;

  let xhr = new XMLHttpRequest();
  let sendhour;
  if(hour > 23) { // 현재 시간에 기준 하여 쿼리스트링 값으로 넘길 시간을 입력한 조건문, 현재 공용 API 에 단기 예보로 기록된 시점이 05 시 부터 3시간 단위로 기록되어 있기에 이전 시간중 가장 가까운 시간으로 요청한다.
    sendhour = 23; 
  }else if(hour > 20) {
    sendhour = 20;
  }else if(hour > 17) {
    sendhour = 17;
  }else if(hour > 14) {
    sendhour = 14;
  }else if(hour > 11) {
    sendhour = 11;
  }else if(hour > 8) {
    sendhour = 8;
  }else if(hour > 5) {
    sendhour = 5;
  }
  // xhr.open("GET", "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=y3igO1ZwlipiZaS1ao6Jc3pQiq8yXTrYxfzw6lsZkpMUE1h6ui86SK2Gnfu5P8MvD5ssg3pqXanFI18DuvmhBQ%3D%3D&pageNo=1&numOfRows=12&dataType=JSON&base_date=202212" + day + "&base_time=" + sendhour + "00&nx=61&ny=125", false) // nodejs 없이 웹 브라우저에서 요청하는경우
  xhr.open("GET", "http://localhost:3000/weather?day=" + day + "&hour=" + sendhour, false)
  
  xhr.send();
  i = JSON.parse(xhr.responseText); // 기상 정보 JSON 타입 저장 변수
  let tmp = 0; // 기온
  let reh = 0; // 습도
  let wsd = 0; // 풍속
  let pty = 0; // 강수형태
  let sky = 0; // 날씨
  i.response.body.items.item.forEach((value) => { // api 로 전달받은 객체의 내부 객체중 item 배열의 index 위치에 따라 예보의 정보가 다르기에, 구분하려고 만든 조건문 이다.
    if(value.category == "TMP") {
      tmp = parseInt(value.fcstValue);
    }else if(value.category == "REH") {
      reh = parseInt(value.fcstValue);
    }else if(value.category == "WSD") {
      wsd = value.fcstValue;
    }else if(value.category == "PTY") {
      pty = parseInt(value.fcstValue);
    }else if(value.category == "SKY") {
      sky = parseInt(value.fcstValue);
    }
  });
  document.querySelector(".temp-num").innerText = tmp+"°";
  document.querySelector(".subdo .subdo-per").innerText = reh+"%";
  document.querySelector(".speed").innerText = "풍속 : " + wsd + "m/s";
  if(pty == 0 && sky == 1) { // 구름 없음 맑음
    document.querySelector(".image").src = "./img/sun.gif"
    document.querySelector(".base").style = "background-image: url(./img/bg/sunny.jpg);"
  }else if(pty == 0 && sky == 3) { // 구름 많음 
    document.querySelector(".image").src = "./img/cloudy.gif"
    document.querySelector(".base").style = "background-image: url(./img/bg/cloudy.jpg);"
  }else if(pty == 0 && sky == 4) { // 흐림 
    document.querySelector(".image").src = "./img/clouds.gif"
    document.querySelector(".base").style = "background-image: url(./img/bg/cloudy2.jpg);"
  }else if(pty == 1) { // 비 옴
    document.querySelector(".image").src = "./img/rain.gif"
    document.querySelector(".base").style = "background-image: url(./img/bg/rain.jpg);"
  }else if(pty == 2) { // 비 / 눈
    document.querySelector(".image").src = "./img/snow&rain.gif"
    document.querySelector(".base").style = "background-image: url(./img/bg/snow&rain.jpg);"
  }else if(pty == 3) { // 눈
    document.querySelector(".image").src = "./img/snow.gif"
    document.querySelector(".base").style = "background-image: url(./img/bg/snow.jpg);"
  }else if(pty == 4) { // 소나기 == 비
    document.querySelector(".image").src = "./img/rain.gif"
    document.querySelector(".base").style = "background-image: url(./img/bg/rain.jpg);"
  }

}

function citylink(str) {
  return "https://api.openweathermap.org/data/2.5/weather?q="+str+"&units=&lang=kr&appid=2c950305dea1fd4ac37dd8631643ba9d"
}


function bgreflash(str) {
  var imgxhr = new XMLHttpRequest();
  imgxhr.open("GET", "http://192.168.0.6:3000/naver?url=" + str, false);
  imgxhr.send();
  let i = JSON.parse(imgxhr.responseText);
  f = i;
  console.log(i.items[0].link)
  document.querySelector(".base").style.backgroundImage = "url(" + i.items[0].link +")"
}

function reflash(str) {
  let xhr = new XMLHttpRequest();
  xhr.setRequestHeader
  xhr.open("GET", citylink(str), false);

  xhr.send();
  let jsoncity = JSON.parse(xhr.responseText);
  document.querySelector(".temp-num").innerText = Math.floor(jsoncity.main.temp-274)+"°"
  document.querySelector(".max-tem").innerText = Math.floor(jsoncity.main.temp_max-274)+"°"
  document.querySelector(".min-tem").innerText = Math.floor(jsoncity.main.temp_min-274)+"°"
  document.querySelector(".subdo .subdo-per").innerText = jsoncity.main.humidity+"%"
  document.querySelector(".city-str").innerText = str
  // bgreflash(str);
}

document.querySelector(".city-text").addEventListener("keypress", function(e) {
  if(e.keyCode == 13) {
    let i = document.querySelector(".city-text").value
    reflash(i);
  }
})


window.onload = function() {
  let tim = new Date();
  year = tim.getFullYear(); month = tim.getMonth()+1; day = tim.getDate();
  hour = tim.getHours(); min = tim.getMinutes(); sec = tim.getSeconds();
  setInterval(() => {
    if(++sec == 60) {
      sec = 0;
      min++;
    }
    document.querySelector(".sec").innerText = sec;
    document.querySelector(".min").innerText = min;
    document.querySelector(".hour").innerText = hour;
    document.querySelector(".year").innerText = year+"년";
    document.querySelector(".month").innerText = month+"월";
    document.querySelector(".day").innerText = day+"일";
  }, 1000);
}