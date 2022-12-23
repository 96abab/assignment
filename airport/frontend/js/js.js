
let airday = 0 // 승객정보 당일0,  내일1
let texp = "P01"
let t1up = [] // 각각의 배열은 시간별로 된 24개의 승객 데이터와 당일 모든 승객의 수를 합친 총합 데이터로 된 25개의 값으로 구성되어있다.
let t1down = []
let t2up = []
let t2down = []

let tt1up = [] // 다음날 정보
let tt1down = []
let tt2up = []
let tt2down = []

let intexctn = 0;
let intextime = 0;
let seoultexctn = 0;
let seoultextime = 0;
let gyengtexctn = 0;
let gyengtextime = 0;
let intertexctn = 0;
let intertextime = 0;

let station = true; // true : 입국장 , false : 출국장
let terminal = true; // true : 제1청사 , false : 제2청사
let airportday = true; // true : 오늘 , false : 내일
let titleday = 0;

if(station) {$(".ipgook").text("출국장")}else {$(".ipgook").text("입국장")}
if(terminal) {$(".cung").text("2청사")}else {$(".cung").text("1청사")}
if(airportday) {$(".days").text("내일")}else {$(".days").text("오늘")}

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

// myInput.addEventListener('shown.bs.modal', () => {
//   // myInput.focus()
//   console.log("모달")
// })


$(".ipgook").click(function() {
  station = !station;
  if(station) {$(".ipgook").text("출국장")}else {$(".ipgook").text("입국장")}
  update();
})
$(".cung").click(function() {
  terminal = !terminal;
  if(terminal) {$(".cung").text("2청사")}else {$(".cung").text("1청사")}
  update();
})
$(".days").click(function() {
  airportday = !airportday;
  if(airportday) {
    $(".days").text("내일")
    titleday = today;
  }else {
    $(".days").text("오늘")
    titleday = today+1;
  }
  update();
})

let today; // 불러오는 승객정보 데이터의 날짜을 저장하는 변수
$.ajaxSetup({ async: false });
$.getJSON("http://apis.data.go.kr/B551177/PassengerNoticeKR/getfPassengerNoticeIKR?serviceKey=y3igO1ZwlipiZaS1ao6Jc3pQiq8yXTrYxfzw6lsZkpMUE1h6ui86SK2Gnfu5P8MvD5ssg3pqXanFI18DuvmhBQ%3D%3D&selectdate=" + 0 + "&type=json",
  function(res) {
    let body; // 공항 전체정보를 배열로(시간별로) 저장 하는 변수
    body = res.response.body.items;
    body.forEach((value, index) => {
      if(index == 0) {today = parseInt(value.adate);titleday = today;}
      t1up.push(parseInt(value.t1sumset2)); t2up.push(parseInt(value.t2sumset2)); t1down.push(parseInt(value.t1sumset1)); t2down.push(parseInt(value.t2sumset1));
    });
  }
);
$.getJSON("http://192.168.0.6:3000/airport",
  function(res) {
    let body; // 공항 전체정보를 배열로(시간별로) 저장 하는 변수
    body = res.response.body.items;
    body.forEach((value, index) => {
      tt1up.push(parseInt(value.t1sumset2)); tt2up.push(parseInt(value.t2sumset2)); tt1down.push(parseInt(value.t1sumset1)); tt2down.push(parseInt(value.t2sumset1));
    });
  }
);

update();

function update() {
  let arr = []
  let str = ""
  if(station && terminal && airportday) {arr = t1down; str = titleday+" 제1청사 입국장 시간별 승객"} // 입국장, 1청사, 오늘 [true, true, true]
  else if(station && !terminal && airportday) {arr = t2down; str = titleday+" 제2청사 입국장 시간별 승객"} // 입국장, 2청사, 오늘 [true, false, true]
  else if(station && !terminal && !airportday) {arr = tt2down; str = titleday+" 제2청사 입국장 시간별 승객"} // 입국장, 2청사, 내일 [true, false, false]
  else if(station && terminal && !airportday) {arr = tt1down; str = titleday+" 제1청사 입국장 시간별 승객"} // 입국장, 1청사, 내일 [true, true, false]

  else if(!station && terminal && airportday) {arr = t1up; str = titleday+" 제1청사 출국장 시간별 승객"} // 출국장, 1청사, 오늘 [false, true, true]
  else if(!station && !terminal && airportday) {arr = t2up; str = titleday+" 제2청사 출국장 시간별 승객"} // 출국장, 2청사, 오늘 [false, false, true]
  else if(!station && !terminal && !airportday) {arr = tt2up; str = titleday+" 제2청사 출국장 시간별 승객"} // 출국장, 2청사, 내일 [false, false, false]
  else if(!station && terminal && !airportday) {arr = tt1up; str = titleday+" 제1청사 출국장 시간별 승객"} // 출국장, 1청사, 내일 [false, true, false]

  for(let i in $(".time")) {
    let temp = "";
    if(i < 10) {temp = "0"+i}else {temp = i}
    $(".time")[i].innerText = temp+`:00`;
  }
  for(let i in $(".man")) {
    $(".man")[i].innerText = "입국 승객 " + arr[i] + "명";
  }
  if(station && terminal && airportday) {document.querySelector("#taxi").style = "display: ;"} // 입국장, 1청사, 오늘 [true, true, true]
  else if(station && !terminal && airportday) {document.querySelector("#taxi").style = "display: ;"} // 입국장, 2청사, 오늘 [true, false, true]
  else {document.querySelector("#taxi").style = "display: none;"}
  $(".title-text").text(str);
  if(station) {
    document.querySelector(".background").style = "background-image: url(img/입국/입국" + ran(15) + ".blur.png)"
  }else {
    document.querySelector(".background").style = "background-image: url(img/출국/출국" + ran(12) + ".blur.png)"
  }
  if(terminal) {texp = "P01"}else {texp = "P03"}
}


let settexi; // 인터벌 삽입할 변수
$(".close").click(function(e) { // 택시 알림창 닫기 후에는 실행한 인터벌 클리어
  document.querySelector(".popup").className = "popup hide"
  document.querySelector('.poppop').className = 'poppop hide';
})
$("#taxi").click(function(e) { // 택시 알림창 실행 후에는 setInterval 을 통해 0.5 초에 한번씩 실시간 택시정보가 업데이트
  document.querySelector(".popup").className = "popup"
  document.querySelector('.poppop').className = 'poppop';

    $.getJSON("http://apis.data.go.kr/B551177/StatusOfTaxi/getTaxiStatus?serviceKey=O1UV%2F2uPlcdCj4cUaAuks17N6Nj0CTeU3GT0osfKD3n3iyWZPzwe9BeMBDnGWWVkH%2FG6nu%2FYHdtZTvK%2FPi3eGQ%3D%3D&numOfRows=10&pageNo=1&terno=" + texp + "&type=json",
      function(res) {
        let body; // 인천공항 발 택시 정보를 객체로 저장하는 변수
        let arr = [];
        body = res.response.body.items[0];
        
        arr.push([body.seoultaxicnt, body.seoulstandtime.slice(0,2)+":00"])
        arr.push([body.incheontaxicnt, body.incheonstandtime.slice(0,2)+":00"])
        arr.push([body.gyenggitaxicnt, body.gyenggistandtime.slice(0,2)+":00"])
        arr.push([body.intercitytaxicnt, body.intercitystandtime.slice(0,2)+":00"])
        
        for(let i in $(".taxiCnt")) {
          let temp = "";
          if(arr[i][0] != "0") { // 각 택시수가 1개 이상인 경우
            temp = "대기 중 " + arr[i][0] + "대";
            $(".taxi")[i].src = "./img/taxi.png"
          }else {
            if(arr[i][1] != "00:00") { // 대기 차 수 가 0대 일때 대기시간이 표기되는 상황
              temp = "대기시간 " + arr[i][1];
              $(".taxi")[i].src = "./img/timer.png"
            }else {
              temp = "시간 확인 중";
              $(".taxi")[i].src = "./img/timer.png"
            }
          }
          $(".taxiCnt")[i].innerText = temp;
          if(i == 3) {break;}
        }
      }
    );
    
})

function ran(int) { // 1 ~ 입력값 까지의 숫자 +1
  return Math.floor(Math.random()*int+1)+1;
}
$(".close").on("mouseover", function(e) {
  document.querySelector(".close").style = ""
})