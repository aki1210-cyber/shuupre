const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//DBコネクト
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shuupre'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/auth', function(req, res, next) {
  console.log("こここここ");
  console.log(req.body.mailaddress);
  console.log(bcrypt.hashSync(req.body.password, 10));
  connection.query(
    'SELECT count(*) as count from user where mailaddress = ?',
    [req.body.mailaddress, bcrypt.hashSync(req.body.password, 10)],
    (err, results) => {
      if(err){
        res.render('test', {err_mess: 'サーバーエラー'});
        return
      }
      if(!results[0].count){
        res.render('test', {err_mess: '存在しない'});
        return
      }
      next()
    }
  );
},
(req, res) => {
  connection.query(
      "select id,name,password from user where mailaddress = ?",
      [req.body.mailaddress],
      (err, result) => {
          if (err) {
              res.render("test", {err_mess: "なんかのミス"})
              return
          }
          if(!bcrypt.compareSync(req.body.password, result[0].password)){
            res.render("test",{err_mess:"パスワード違う"});
            return
          }
          req.session.user_id = result[0].id
          req.session.user_name = result[0].name
          res.redirect("/")
      }
  )
}
)

module.exports = router;

