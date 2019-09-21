function underline_draw() {
  axios.get("/api/v1/underline_draw").then(res => {
    let cemi = document.getElementById("calendar");
    for (let i = 0; i < res.data.length; i++) {
      //0부터 10번째까지 자름
      // console.log(res.data[i].s_date.substring(0, 10));
      let localeDate = new Date(res.data[i].s_date).toLocaleString();
      let arr = localeDate.split(". ");
      console.log(arr);
      if (arr[1] < 10) {
        arr[1] = "0" + arr[1];
      }
      if (arr[2] < 10) {
        arr[2] = "0" + arr[2];
      }
      let dbdata = `${arr[0] + arr[1] + arr[2]}`;
      // console.log(dbdata);
      let str = document.getElementById(`s${dbdata}`);
      //가져온 디비의 값이 table의 td의 id로 존재한다면(null이 아니라면) underline으로 변경
      if (str != null) {
        str.style.textDecoration = "underline";
      }
    }
  });
}

//스케쥴찍기
function schedule_draw() {
  axios.get("/api/v1/schedule_draw").then(res => {
    //가져온 데이터 찍기
    console.log(res.data);
    for (let i = 0; i < res.data.length; i++) {
      let localeDate = new Date(res.data[i].s_date).toLocaleString();
      let arr = localeDate.split(". ");
      console.log(arr);
      if (arr[1] < 10) {
        arr[1] = "0" + arr[1];
      }
      if (arr[2] < 10) {
        arr[2] = "0" + arr[2];
      }
      let dbdata = `${arr[0] + arr[1] + arr[2]}`;
      console.log(dbdata);
      let str = document.getElementById(`l${dbdata}`);
      //가져온 디비의 값이 table의 td의 id로 존재한다면(null이 아니라면) title 추가
      if (str != null) {
        let string = document.getElementById(`l${dbdata}0`);
        console.log(string);
        string.innerHTML = `${res.data[i].title}`;
        console.log("하나 추가");
      }
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
