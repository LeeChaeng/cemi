function l_preCalendar() {
  //getFullYear() ==> 현재 년도
  //getMonth() ==> 현재 월
  //getDate() ==> 현재 날짜
  today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  l_mkCalendar();
}

function l_nextCalendar() {
  today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  l_mkCalendar();
}

function l_mkCalendar() {
  //이번 달의 첫째 날 가져오기
  let firstday = new Date(today.getFullYear(), today.getMonth(), 1);
  //이번 달의 마지막 날 가져오기 (다음 달의 -1인 0일 가져옴)
  let lastday = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  let tbCalendar = document.getElementById("lcalendar");
  let tbCalendarYM = document.getElementById("l_tbCalendarYM");
  tbCalendarYM.innerHTML =
    today.getFullYear() + "년 " + (today.getMonth() + 1) + "월";

  //이번 달이 끝나면 다음달로 넘겨주는 역할
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

  //테이블 초기화
  row = tbCalendar.insertRow();

  //둘 다 공백의 개수를 세어줌
  let cnt = 0;
  let count = 0;
  //몇 번 칸에서 시작할거니
  for (i = 0; i < firstday.getDay(); i++) {
    //이번달의 day만큼 돌림
    cell = row.insertCell();
    for (let j = 0; j < 3; j++) {
      cell.innerHTML += `<div class="testDiv blank"></div>`;
    }

    cnt++;
    count++;
  }
  for (i = 1; i < lastday.getDate(); i++) {
    count++;
  }

  let rowcount = 3;
  if (count >= 35) {
    rowcount = 2;
  }

  //공백의 개수보다 하나 더해서 시작하는 칸 수를 저장

  //달력 출력(1)
  for (i = 1; i <= lastday.getDate(); i++) {
    //dir_count => cell에서의 td개수 --> 처음 들어갈때는 하나도 안들어가있으니까 0으로 초기화
    let dir_count = 0;
    cell = row.insertCell();
    cell.id = `l${to_day}`;
    cell.innerHTML = i;
    cell.innerHTML += `<div class="testDiv" id="l${to_day}${dir_count}"></div>`;
    dir_count++;
    cell.innerHTML += `<div class="testDiv" id="l${to_day}${dir_count}"></div>`;
    console.log(cnt);
    cnt += 1;
    if (cnt % 7 == 1) {
      //일요일 계산
      dir_count = 0;
      cell.innerHTML = "<font color=#F79DC2>" + i + "</font>";
      cell.innerHTML += `<div class="testDiv" id="l${to_day}${dir_count}"></div>`;
      dir_count++;
      cell.innerHTML += `<div class="testDiv" id="l${to_day}${dir_count}"></div>`;
    }
    if (cnt % 7 == 0) {
      //토요일 구하기
      dir_count = 0;
      cell.innerHTML = "<font color=skyblue>" + i + "</font>";
      cell.innerHTML += `<div class="testDiv" id="l${to_day}${dir_count}"></div>`;
      dir_count++;
      cell.innerHTML += `<div class="testDiv" id="l${to_day}${dir_count}"></div>`;
      row = lcalendar.insertRow();
      // if (count >= 35) {
      //   for (j = 0; j < 2; j++) {
      //     for (k = 0; k < 7; k++) {
      //       cell = row.insertCell();
      //     }
      //     row = lcalendar.insertRow();
      //   }
      // } else {
      //   for (j = 0; j < 3; j++) {
      //     for (k = 0; k < 7; k++) {
      //       cell = row.insertCell();
      //     }
      //     row = lcalendar.insertRow();
      //   }
      // }
      row = lcalendar.insertRow();
    }
    //오늘 체크
    if (
      today.getFullYear() == date.getFullYear() &&
      today.getMonth() == date.getMonth() &&
      i == date.getDate()
    ) {
      //셀 배경
      cell.bgColor = "#FAF58C";
    }

    to_day += 1;
  }
}
