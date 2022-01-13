var express = require('express');
var path = require('path');
var mysql = require('mysql');
const { title } = require('process');
const { session } = require('passport');

var app = express();
var router = express.Router();

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
  connection.query(
    'SELECT article.id as id, name, create_date, title FROM user INNER JOIN article ON article.user_id = user.id ORDER BY article.id DESC LIMIT 4',
    (error, results) => {
      newarticles = results
    }
  )
  //ランキング表示
  connection.query(
    'SELECT article.id as id, name, create_date, title FROM article INNER JOIN user ON article.user_id = user.id ORDER BY (SELECT COUNT(article_id) FROM favorite WHERE article.id = favorite.article_id) DESC LIMIt 6',
    (error, results) => {
      res.render('index', { newarticles: newarticles, rankings : results, session_id:req.session.user_id, session_name:req.session.user_name});
    }
  );
});


module.exports = router;

