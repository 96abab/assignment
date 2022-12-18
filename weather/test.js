let hour = 0;
let min = 0;
let sec = 0;
let year = 0;
let month = 0;
let day = 0;

var i;

setTimeout(bitweather, 50);

function bitweather() {
  let xhr = new XMLHttpRequest();
  let sendhour;
  if (hour > 23) {
    sendhour = 23;
  }else if (hour > 20) {
    sendhour = 20;
  }else if (hour > 17) {
    sendhour = 17;
  }else if (hour > 14) {
    sendhour = 14;
  }else if (hour > 11) {
    sendhour = 11;
  }else if (hour > 8) {
    sendhour = 8;
  }else if (hour > 5) {
    sendhour = 5;
  }

  xhr.open("GET", "http://localhost:3000/weather?day=" + day + "&hour=" + sendhour, false)

  xhr.send();
  i = JSON.parse(xhr.responseText);
  let tmp = 0;
  let reh = 0;
  let wsd = 0;
  let pty = 0;
  let sky = 0;
  i.response.body.items.item.forEach((value) => {
    if (value.category == "TMP") {
      tmp = parseInt(value.fcstValue);
    }else if (value.category == "REH") {
      reh = parseInt(value.fxstValue);
    }else if (value.category == "WSD") {
      wsd = value.fcstValue;
    }else if (value.category == "PTY") {
      pty = parseInt(value.fcstValue);
    }else if (value.category == "SKY") {
      sky = parseInt(value.fcstValue);
    }
  });
  document.querySelector(".temp-num").innerText = tmp+"°";
  document.querySelector(".subdo .subdo-per").innerText = reh+"%";
  document.querySelector(".speed").innerText = "풍속 : " + wsd + "m/s";
  if (pty == 0 && sky == 1) {
    document.querySelector(".image").src = "./img/sun.gif";
    document.querySelector(".base").style = "background-image: url(./img/bg/sunny.jpg)";
  }else if (pty == 0 && sky == 3) {
    document.querySelector(".image").src = "./img/cloudy.gif";
    document.querySelector(".base").
  }



}