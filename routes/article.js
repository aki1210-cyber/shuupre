const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const { title, nextTick } = require('process');

const app = express();
const router = express.Router();
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


router.get('/:article_id', function(req, res) {
  favo_flg = 0
  connection.query(
    'SELECT COUNT(*) FROM favorite WHERE user_id = ? AND article_id = ?',
    [req.session.user_id, req.params.article_id],
    (error, results) => {
      console.log(results[0]["COUNT(*)"])
      if(results[0]["COUNT(*)"] == 1){
        favo_flg = 1
        console.log("お気に入り済み")
      }
    }
  )
  connection.query(
    'SELECT name, create_date, title, html_code FROM user INNER JOIN article ON article.user_id = user.id WHERE article.id = ?',
    [req.params.article_id],
    (error, results) => {
      console.log(favo_flg)
      res.render('article', {content : results, session_id:req.session.user_id, favo_flg : favo_flg, session_name:req.session.user_name});
    }
    
  );
});

router.post('/', function(req, res) {
  console.log(req.body.article_id)
  if(req.body.flg == 1){
    connection.query(
      'INSERT INTO favorite(user_id, article_id) VALUE(?, ?)',
      [req.session.user_id, req.body.article_id],
      (err, results) => {
        if (err){
          res.render("test",{err_mess:"インサートエラー"})
        }
        console.log(results)
      }
      
    );
  }else{
    connection.query(
      'DELETE FROM favorite WHERE user_id = ? AND article_id = ?',
      [req.session.user_id, req.body.article_id],
      (err, results) => {
        if (err){
          res.render("test",{err_mess:"インサートエラー"})
        }
        console.log(results)
      }
      
    );  }
  res.end();
});

module.exports = router;

