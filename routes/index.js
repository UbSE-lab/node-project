var express = require('express');
var router = express.Router();
const pool = require("../db/db");

/* GET home page. */
/*async, await : 비동기 처리를 할 때 사용
/ async를 했는데 await 안하면? -> 안에 데이터를 볼 수가 없음. -> promise<< padding>> */
router.get('/', async(req, res, next) => {
  const data = await pool.query("select * from items;");
  console.log(data[0]);
  res.render('index', {item: data[0]});
});

router.post("/item", async(req, res, next) => {
  /* DML : 데이터 조작 언어
    select from 테이블 이름 where 데이터 : 검색하다
    insert into 테이블 이름 values() : 추가하다
    delete from 테이블 이름 where 데이터 : 삭제하다
    update 테이블이름 set 바꾸고 싶은 데이터 : 수정하다  */
  const{name, price, count} = req.body;
  console.log(req.body);

  await pool.query("insert into items values (null,?,?)",[name, price])
  res.send(
    '<script type = "text/javascript">alert("제품이 추가되었습니다."); location.href="/";</script>'
  );
  console.log("name : ", name);
  console.log("price : ", price);
  console.log("count : ", count);
  
  res.render("post", {name:name, price:price, count:count})
});


router.post("/post", async(req,res,next) => {
  res.render("post", {name:name, price:price, count:count})
})

router.get("/login", async(req ,res,next) => {
  res.render("login");
});

/*res.render : 불러오기 */
router.get("/test", async(req,res,next) => {
  res.render("card");
});

router.get("/item", async(req,res,next) => {
  const data = await pool.query("select * from items");
  res.render("item_add", {items : data[0]});
});

router.post("/item", async(req, res, next) => {
  const{name, count, price} = req.body;

  await pool.query("insert into items values (null, ?, ?)", [name, price]);

  return res.send(
    '<script type = "text/javascript">alert("제품이 추가되었습니다."); location.href="/item";</script>'
  );
});

router.get("/delete/:name", async(req,res,next) => {
  const {name} = req.params;
  await pool.query("delete from items where name = ?", [name]);

  return res.send(
    '<script type = "text/javascript">alert("제품이 삭제되었습니다"); location.href = "/item";</script>'
  );
  console.log(name);
})


router.get("/edit/:name", async(req,res,next) => {
  const { name } = req.params;
  const data = await pool.query("select * from items where name = ?", [name]);
  res.render("item_edit", {item: data[0][0]});
});

router.post("/edit", async (req, res, next) => {
  const {name, price, count, id} = req.body;
  await pool.query("update items set name=?, price=? where id = ?", [name, price, id]);

  return res.send(
    '<script type = "text/javascript">alert("제품이 수정되었습니다"); location.href = "/item";</script>'
  );
})

module.exports = router;

