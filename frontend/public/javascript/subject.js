window.onload = () => {
  diary();
  subject();
  underline_draw();
  schedule_draw();
};

function subject() {
  axios.get("/api/v1/test").then(res => {
    let str = "";
    for (let i = 0; i < res.data.length; i++) {
      str += "<input type='checkbox'>";
      str += res.data[i].cate_name;
      str += "&nbsp;";
    }
    document.getElementById("sub_body").innerHTML = str;
  });
}

function diary() {
  axios.get("/api/v1/diary_l").then(res => {
    let str = "";
    let cnt = 0;
    for (let i = 0; i < res.data.length; i++) {
      if (cnt > 2) break;

      str += `<div class="dcal_cont"><i class="dcal_i">${
        res.data[i].title
      }</i></div>`;
      cnt++;
    }
    document.getElementById("dcal_in").innerHTML = str;
  });
}
