window.onload = () => {
  print_schedule();
  write_append_diary();
  write_modify_diary();
};

function print_schedule() {
  axios.get("/api/v1/appendDR").then(res => {
    console.log(res.data);

    let div = document.getElementById("remainDiary");
    let string = "";
    div.innerHTML = string;

    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].diary == false) {
        let div = document.getElementById("remainDiary");
        let str = "";
        str += "<div class='drcontent'><a href='/diary?num=";
        str += res.data[i].sch_num;
        str += "' onclick='write_append_diary()'>";
        str += res.data[i].title;
        str += "</a>";
        str += "<br>";
        str += res.data[i].s_date.substring(0, 10);
        str += " ~ ";
        str += res.data[i].e_date.substring(0, 10);
        str += "</div>";

        div.innerHTML += str;
      }
    }
  });
}

function write_diary() {
  axios.get("/api/v1/writeDR").then(res => {
    console.log(res.data);

    let div = document.getElementById("remainDiary");
    let string = "";
    div.innerHTML = string;

    for (let i = 0; i < res.data.length; i++) {
      let div = document.getElementById("remainDiary");
      let str = "";
      str += "<div class='drcontent'><a href='/diary?dir_num=";
      str += res.data[i].sch_num;
      str += "' onclick='write_modify_diary()'>";
      str += res.data[i].title;
      str += "</a><br>";
      str += res.data[i].date.substring(0, 10);
      str += "</div>";

      div.innerHTML += str;
    }
  });
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  console.log(results);
  if (results == null) {
    return null;
  }
  return results[2];
}

function write_append_diary() {
  let scheduleNum = getParameterByName("num");
  if (scheduleNum == null) {
    return;
  }
  let div = document.getElementById("r_diary");
  let str = "";
  div.innerHTML = str;
  str += `<form action="/append" method="post" name="inputForm" id="append">`;
  str += `<div class=what><i class="lbl">일정 번호</i> : &nbsp;<input type="text" class="label" value=${scheduleNum} name="sch_num" size="10" readonly>&nbsp;&nbsp;&nbsp;<i class="lbl">작성일</i> : &nbsp;<input type="text" class="label" value="${getTimeStamp()}" name="date" size="20" readonly></div>`;
  str += `<div class="what">
  <input type="text" class="inputTitle" placeholder="제목 입력" maxlength="15" id="title" name="title"></div>`;
  str += `<div class="what"><textarea class="content" name="content" cols="115" rows="23" placeholder="내용을 입력하세요. (500자 제한)" maxlength="1000" id="content"></textarea></div>`;
  str += `<div class="save_big"><input type="button" class="save" value="저장" onclick=button_submit()></div>`;
  str += `</form>`;
  div.innerHTML = str;
}

function write_modify_diary() {
  let DiaryNum = getParameterByName("dir_num");
  if (DiaryNum == null) {
    return;
  }
  axios.get("/api/v1/writeDR").then(res => {
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].sch_num == DiaryNum) {
        let div = document.getElementById("r_diary");
        let str = "";
        div.innerHTML = str;
        str += `<form action="/modifyDR" method="post" name="inputForm" id="modifyDR">`;
        str += `<div class=what><i class="lbl">일정 번호</i> : &nbsp;<input type="text" class="label" value=${DiaryNum} name="sch_num" size="10" readonly>&nbsp;&nbsp;&nbsp;<i class="lbl">작성일</i> : &nbsp;<input type="text" class="label" value="${getTimeStamp()}" name="date" size="20" readonly></div>`;
        str += `<div class="what">
  <input type="text" class="inputTitle" placeholder="제목 입력" maxlength="20" id="title" name="title" value="${
    res.data[i].title
  }" readonly></div>`;
        str += `<div class="what"><textarea class="content" name="content" cols="115" rows="23" maxlength="1000" id="content" readonly>${
          res.data[i].content
        }</textarea></div>`;
        str += `<div class="save_big"><input type="button" class="save" value="수정" id="modify_button" onclick=diary_modify()></div>`;
        str += `</form>`;
        div.innerHTML = str;
      }
    }
  });
}

function diary_modify() {
  let button = document.getElementById("modify_button");
  let inputTitle = document.getElementById("title");
  let content = document.getElementById("content");

  if (button.value == "수정") {
    inputTitle.readOnly = false;
    content.readOnly = false;
    alert("수정 가능합니다.");
    button.value = "저장";
  } else if (button.value == "저장") {
    $("#modifyDR").submit();
    alert("보내짐");
    inputTitle.readOnly = true;
    content.readOnly = true;
    alert("저장되었습니다.");
    button.value = "수정";
  }
}

function button_submit() {
  let title = document.getElementById("title").value;
  let content = document.getElementById("content").value;

  if (title == null || title == "") {
    alert("제목을 입력해주세요");
    return;
  }

  if (content == null || content == "") {
    alert("내용을 입력해주세요!");
    return;
  }

  $("#append").submit();
  alert("SUCCESS!");
}

function getTimeStamp() {
  let d = new Date();

  let s =
    leadingZeros(d.getFullYear(), 4) +
    `-` +
    leadingZeros(d.getMonth() + 1, 2) +
    `-` +
    leadingZeros(d.getDate(), 2) +
    ` ` +
    leadingZeros(d.getHours(), 2) +
    `:` +
    leadingZeros(d.getMinutes(), 2) +
    `:` +
    leadingZeros(d.getSeconds(), 2);

  console.log(s);
  return s;
}

function leadingZeros(n, digits) {
  let zero = "";
  n = n.toString();

  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++) zero += "0";
  }
  return zero + n;
}
