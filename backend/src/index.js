import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import session from "express-session";
import path from "path";
import fs from "fs";
import dateUtils from "date-utils";

import api from "./api";
import connection from "./lib/sql";

const app = express();
const port = 4000;
let count = fs.readFileSync("./count.txt", "utf-8");
let newDate = new Date();
let time = Date.now();

//오류처리 --> 서버에서 오류 났을때 catch해주는거, 오류시 500번 보내주고 끝냄
app.use(function(err, req, res, next) {
  console.error(err.stack);
  return res.status(500).json({ code: 0 });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan("dev"));

//세션
app.use(
  session({
    secret: "chaeyoung", //세션 암호화
    resave: false, //db저장 x resave=true면 싹다 다시
    saveUninitialized: false, //빈 세션 만듬, 자원낭비..
    rolling: true, //쿠키 --> 유효시간, 유효시간 지나기 전 접속--> 초기화
    cookie: {
      maxAge: 365 * (24 * 60 * 60 * 1000)
    }
  })
);

app.use("/api", api);

app.use(
  express.static(path.resolve(__dirname, "..", "..", "frontend", "public"))
);

app.use(
  express.static(
    path.resolve(__dirname, "..", "..", "frontend", "public", "html"),
    { extensions: ["html"] }
  )
);

app.post("/save", (req, res) => {
  let sql =
    "insert into schedule (title,s_date,e_date,content,cate_num,sch_num,diary) values (?,?,?,?,?,?,?)";

  let value = [
    req.body.title,
    req.body.startdate,
    req.body.enddate,
    req.body.content,
    req.body.subject,
    count++,
    false
  ];
  fs.writeFileSync("./count.txt", count);
  connection.query(sql, value, (err, rows, result) => {
    if (err) {
      throw err;
    }
    res.redirect("/main.html");
  });
});

app.post("/append", (req, res) => {
  console.log(req.body);
  let sql = "insert into diary(sch_num,date,content,title) values(?,?,?,?)";

  let value = [
    req.body.sch_num,
    req.body.date,
    req.body.content,
    req.body.title
  ];

  connection.query(sql, value, (err, rows, result) => {
    if (err) {
      throw err;
    }
  });

  let sql2 = "update schedule set diary=true where sch_num=?";
  let value2 = req.body.sch_num;
  connection.query(sql2, value2, (err, rows, result) => {
    if (err) {
      throw err;
    }
  });

  res.redirect("/diary.html");
});

app.post("/modifyDR", (req, res) => {
  console.log(req.body);
  let sql = "update diary set date=?,title=?,content=?where sch_num=?";
  let value = [
    req.body.date,
    req.body.title,
    req.body.content,
    req.body.sch_num
  ];
  connection.query(sql, value, (err, rows, result) => {
    if (err) {
      throw err;
    }
  });
  res.redirect("/diary.html");
});

app.listen(port, () => {
  console.log("\x1b[35m", "Api server is running at", port);
});
