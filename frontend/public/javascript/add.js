function button_onclick() {
  title = document.getElementById("title").value;
  startdate = document.getElementById("startdate").value;
  enddate = document.getElementById("enddate").value;

  if (title == null || title == "") {
    alert("제목을 입력해주세요");
    return;
  }

  if (startdate == null || startdate == "") {
    alert("시작 날짜를 입력해주세요!");
    return;
  }

  if (enddate == null || enddate == "") {
    alert("끝나는 날짜를 입력해주세요!");
    return;
  }
  $("#save").submit();
  alert("SUCCESS!");
}

function allDay() {
  checkbox = document.getElementById("allday");
  start = document.getElementById("startdate");
  end = document.getElementById("enddate");

  if (checkbox.checked == true) {
    end.value = start.value;
  }
}
