const express = require('express');
const path = require('path');
const mysql = require('mysql');
const fs = require('fs');
const multer = require('multer');
require('date-utils');


const upload = multer({ dest: './public/images/user_up' })
const app = express();
const router = express.Router();
app.use(express.urlencoded({
  extended: true
}));
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
  // if(typeof(req.session.user_id) != 'undefined'){
  //   res.render('add', {session_id:req.session.user_id});
  // }else{
  //   res.render("login")
  // }
  res.render('add', {session_id:req.session.user_id, session_name:req.session.user_name});
});

router.post('/', upload.array('content'), function(req, res) {
  const title = req.body.title;
  const content = req.body.content;
  let html_code = "<h1>"+title+"</h1>";
  const n = req.files.length;
  let filename_array=[]
  let num = 0
  const date = new Date();
  try {
    let currentTime = date.toFormat('YYYYMMDDHH24MISS');
      for (let i = 0; i < n; i++) {
        let filename=currentTime+i
        if(req.files[i].mimetype=="image/jpeg"){
          filename+=".jpeg"
        }else if(req.files[i].mimetype=="image/png"){
          filename+=".png"
        }
        const path = req.files[i].path.replace(/\\/g, "/");
        const dest = './public/images/user_up/'+filename;
        fs.renameSync(path, dest);  // 長い一時ファイル名を元のファイル名にリネームする。
        filename_array.push(filename)
      }
      for (let i = 0; i < content.length; i++) {
        if(content[i] != 'img'){
          //テキスト
          //urlかのチェック
          html_code += "<p>"+content[i]+"</p>";
        }else{
          //画像
          html_code += "<img src='/images/user_up/"+filename_array[num]+"'>"
          num++
        }
      }
      let create_date = date.toFormat('YYYY-MM-DD HH24:MI:SS');

      connection.query(
        'INSERT INTO article(html_code, title, create_date, user_id) VALUES(?, ?, ?, ?)',
        [html_code, req.body.title, create_date, req.session.user_id],
        (err, results) => {
          if (err){
            res.render("test",{err_mess:"インサートエラー"})
          }
        }
      )
  }
  catch (err) {
      res.render('upload', {message: "エラー：アップロードできませんでした。"});
  }
  res.redirect("/mypage");
});

module.exports = router;

