let airday = 0 // 승객정보 당일0,  내일1
let texp = "P01"
let t1up = [] // 각각의 배열은 시간별로 된 24개의 승객 데이터와 당일 모든 승객의 수를 합친 총합 데이터로 된 25개의 값으로 구성되어있다.
let t1down = []
let t2up = []
let t2down = []

let intexctn = 0;
let intextime = 0;
let seoultexctn = 0;
let seoultextime = 0;
let gyengtexctn = 0;
let gyengtextime = 0;
let intertexctn = 0;
let intertextime = 0;


$.getJSON("http://apis.data.go.kr/B551177/PassengerNoticeKR/getfPassengerNoticeIKR?serviceKey=y3igO1ZwlipiZaS1ao6Jc3pQiq8yXTrYxfzw6lsZkpMUE1h6ui86SK2Gnfu5P8MvD5ssg3pqXanFI18DuvmhBQ%3D%3D&selectdate=" + airday + "&type=json",
  function(res) {
    let body; // 공항 전체정보를 배열로(시간별로) 저장 하는 변수
    let today; // 불러오는 승객정보 데이터의 날짜을 저장하는 변수
    body = res.response.body.items;
    body.forEach((value, index) => {
      today = value.adate;
      t1up.push(parseInt(value.t1sumset2)); t2up.push(parseInt(value.t2sumset2)); t1down.push(parseInt(value.t1sumset1)); t2down.push(parseInt(value.t2sumset1));
    });
  }
);

$.getJSON("http://apis.data.go.kr/B551177/StatusOfTaxi/getTaxiStatus?serviceKey=y3igO1ZwlipiZaS1ao6Jc3pQiq8yXTrYxfzw6lsZkpMUE1h6ui86SK2Gnfu5P8MvD5ssg3pqXanFI18DuvmhBQ%3D%3D&numOfRows=10&pageNo=1&terno=" + texp + "&type=json",
  function(res) {
    let body; // 인천공항 발 택시 정보를 객체로 저장하는 변수
    body = res.response.body.items[0];
    

    intexctn = body.incheontaxicnt;
    intextime = body.incheonstandtime.slice(0,2)+":00";

    gyengtexctn = body.gyenggitaxicnt;
    gyengtextime = body.gyenggistandtime.slice(0,2)+":00";

    intertexctn = body.intercitytaxicnt;
    intertextime = body.intercitystandtime.slice(0,2)+":00";

    seoultexctn = body.seoultaxicnt;
    seoultextime = body.seoulstandtime.slice(0,2)+":00";
    
    console.log(`서울 택시: ${seoultexctn}대 | 대기 시간: ${seoultextime}분`);
    console.log(`인천 택시: ${intexctn}대 | 대기 시간: ${intextime}분`);
    console.log(`경기 택시: ${gyengtexctn}대 | 대기 시간: ${gyengtextime}분`);
    console.log(`인터 택시: ${intertexctn}대 | 대기 시간: ${intertextime}분`);

  }
);

function view(arr) {
  let cung = ""; let go = "";
  if(arr == t1down) {
    cung = "제1청사"
    go = "입국"
  }else if(arr == t1up) {
    cung = "제1청사"
    go = "출국"
  }else if(arr == t2down) {
    cung = "제2청사"
    go = "입국"
  }else if(arr == t2up) {
    cung = "제2청사"
    go = "출국"
  }
  arr.forEach((value, index) => {
    if(index == 24) {return};
    console.log(`${index+1}:00  ${cung} ${go}장 승객  ${value}명`)
  })
}



