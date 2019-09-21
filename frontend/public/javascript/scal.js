let today = new Date();
let date = new Date();
let date1 = new Date("0/0/0");
let currDay = 24 * 60 * 60 * 1000; //시 * 분 * 초 * 밀리세컨

function preCalendar() {
  //getFullYear() ==> 현재 년도
  //getMonth() ==> 현재 월
  //getDate() ==> 현재 날짜
  today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  mkCalendar();
}

function nextCalendar() {
  today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  mkCalendar();
}

function mkCalendar() {
  //이번 달의 첫째 날 가져오기
  let firstday = new Date(today.getFullYear(), today.getMonth(), 1);
  //이번 달의 마지막 날 가져오기 (다음 달의 -1인 0일 가져옴)
  let lastday = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  let tbCalendar = document.getElementById("calendar");
  let tbCalendarYM = document.getElementById("tbCalendarYM");
  tbCalendarYM.innerHTML =
    today.getFullYear() + "년 " + (today.getMonth() + 1) + "월";

  //이번 달이 끝나면 다음달로 넘겨주려고 날짜 테이블 초기화 하는 부분
  while (tbCalendar.rows.length > 2) {
    tbCalendar.deleteRow(tbCalendar.rows.length - 1);
  }

  let row = null;

  let month = today.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }

  let diff = `${today.getFullYear()}${month}01`;
  //0000년 00월 00일부터의 날짜 계산
  let to_day = parseInt(diff);
  console.log(to_day);

  row = tbCalendar.insertRow();
  let cnt = 0;
  for (i = 0; i < firstday.getDay(); i++) {
    //이번달의 빈칸의 날만큼 돌림
    //빈칸찍기
    cell = row.insertCell();
    cnt = cnt + 1;
  }

  //달력 출력
  for (i = 1; i <= lastday.getDate(); i++) {
    cell = row.insertCell();
    cell.id = `s${to_day}`;
    cell.innerHTML = `<a href="/main?cellid=${cell.id}">${i}</a>`;
    to_day += 1;
    cnt += 1;
    if (cnt % 7 == 1) {
      //일요일 계산
      cell.innerHTML = `<a href="/main?cellid=${
        cell.id
      }"><font color=#F79DC2>${i}</a>`;
    }
    if (cnt % 7 == 0) {
      //토요일 구하기
      cell.innerHTML = `<a href="/main?cellid=${
        cell.id
      }"><font color=skyblue>${i}</a>`;
      row = calendar.insertRow();
    }
    if (
      today.getFullYear() == date.getFullYear() &&
      today.getMonth() == date.getMonth() &&
      i == date.getDate()
    ) {
      //셀 배경
      cell.bgColor = "#FAF58C";
    }
  }
}
