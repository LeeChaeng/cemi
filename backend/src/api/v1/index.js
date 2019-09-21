import express from "express";
import connection from "../../lib/sql";

const router = express();

router.get("/test", (req, res) => {
  connection.query("select * from category", (err, rows) => {
    if (err) {
      throw err;
    }
    console.log(rows[0]);
    return res.json(rows);
  });
});

router.get("/appendDR", (req, res) => {
  connection.query("select * from schedule", (err, rows) => {
    if (err) {
      throw err;
    }
    return res.json(rows);
  });
});

router.get("/writeDR", (req, res) => {
  connection.query("select * from diary", (err, rows) => {
    if (err) {
      throw err;
    }
    return res.json(rows);
  });
});

router.get("/diary_l", (req, res) => {
  connection.query("select * from diary order by date desc", (err, rows) => {
    if (err) {
      throw err;
    }
    return res.json(rows);
  });
});

router.get("/underline_draw", (req, res) => {
  connection.query("select distinct s_date from schedule", (err, rows) => {
    if (err) {
      throw err;
    }
    console.log(rows);
    return res.json(rows);
  });
});

router.get("/schedule_draw", (req, res) => {
  connection.query(
    "select left(title,10) as title, s_date from schedule order by s_date",
    (err, rows) => {
      if (err) {
        throw err;
      }
      console.log(rows[0].s_date);
      return res.json(rows);
    }
  );
});

export default router;
