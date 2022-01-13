var express = require('express');
var path = require('path');
var mysql = require('mysql');
const { title } = require('process');

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
    if(typeof(req.session.user_id) == 'undefined'){
        res.render('login');
        return
    }
  connection.query(
    'SELECT article.id as id, name, create_date, title, introduction FROM article INNER JOIN user ON user.id = article.user_id WHERE article.user_id = ? ORDER BY article.id DESC LIMIT 4',
    [req.session.user_id],
    (error, results) => {
      articles = results
    }
  );
  connection.query(
    'SELECT article.id as id, name, create_date, title FROM article INNER JOIN favorite ON article.id = favorite.article_id INNER JOIN user ON user.id = article.user_id WHERE favorite.user_id = ? ORDER BY article.id DESC LIMIT 6',
    [req.session.user_id],
    (error, results) => {
      res.render('mypage', {content : articles, favo_articles : results, session_id:req.session.user_id, session_name:req.session.user_name});
    }
  );
});

module.exports = router;

