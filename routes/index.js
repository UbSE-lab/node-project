var express = require("express");
var router = express.Router();
const pool = require("../db/db");

router.get("/", async (req, res, next) => {
  const data = await pool.query("select * from items;");
  console.log(data[0]);

  res.render("index", { item: data[0] });
});

router.get("/item", async (req, res, next) => {
  const items = await pool.query("select * from items;");

  res.render("item_add", { items: items[0] });
});

router.post("/item", async (req, res, next) => {
  const { name, price, count, category } = req.body;

  await pool.query("insert into items values (null,?,?,?)", [name, price, category]);

  res.send(
    `<script type = "text/javascript">alert("제품이 추가되었습니다."); window.history.back();</script>`
  );
});

router.get("/edit", async (req, res, next) => {
  const { name } = req.query;

  const item = await pool.query("select * from items where name=?", [name]);
  console.log(item[0]);

  res.render("item_edit", { item: item[0][0] });
});

router.post("/edit", async (req, res, next) => {
  const { id, name, price, count, category } = req.body;
  console.log(id, name, price, count, category);
  await pool.query("update items set name=?, price=?, category=? where id=?", [
    name,
    price,
    category,
    id,
  ]);

  res.send(
    `<script type = "text/javascript">alert("제품이 수정되었습니다."); location.href="/item";</script>`
  );
});

router.get("/delete/:name", async (req, res, next) => {
  const { name } = req.params;
  console.log(name);

  await pool.query("delete from items where name=?", [name]);

  res.send(
    `<script type = "text/javascript">alert("제품이 삭제되었습니다."); location.href="/item";</script>`
  );
});

// 보류
router.get("/main", async (req, res, next) => {
  res.render("main");
});

router.get("/:category", async (req, res, next) => {
  console.log("category: ", req.params.category);

  const data = await pool.query("select * from items where category = ?;", [req.params.category]);
  console.log(data[0]);

  res.render("items", { item: data[0] });
});

module.exports = router;

// <% for(let i=0; i<item.length; i++) { %>

//   <%- include card.ejs %>

// <% } %>
