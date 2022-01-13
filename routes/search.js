const express = require('express');
const path = require('path');
const mysql = require('mysql');

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

router.get('/', function(req, res) {
  res.render('login', { title: 'Express' });
});

router.post('/', function(req, res) {
  connection.query(
      "select article.id as id, name, create_date, title from article INNER JOIN user ON user.id = article.user_id where html_code LIKE ?",
      ["%"+req.body.keyword+"%"],
      (err, results) => {
          console.log(results)
          res.render('search_result', {content : results, session_id:req.session.user_id, session_name:req.session.user_name});
        }
  )
})

module.exports = router;

