const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const addRouter = require('./routes/add');
const resistRouter = require('./routes/resist');
const articleRouter = require('./routes/article');
const mypageRouter = require('./routes/mypage');
const searchRouter = require('./routes/search');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const MySQLStore = require('express-mysql-session')(session);

const options = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shuupre'
};

const sessionStore = new MySQLStore(options);

const sess = {
  secret: 'secretsecretsecret',
  cookie: { maxAge: 30*24*60*60*1000 },
  store: new MySQLStore(options),
  resave: false,
  saveUninitialized: true,
}

app.use(session(sess))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/auth',loginRouter);
app.use('/add', addRouter);
app.use('/resist', resistRouter);
app.use('/article', articleRouter);
app.use('/mypage', mypageRouter);
app.use('/search', searchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const bcrypt = require('bcrypt');
const password = "password";
const salt = bcrypt.genSaltSync(10);
let hashed_password = bcrypt.hashSync(password, salt);
console.log(hashed_password);

module.exports = app;
