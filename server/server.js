require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const sequelize = require('./database').sequelize;
const rootRouter = require('./routers/root_router');
const seed = require('./seed');
const PORT = 8000;
const app = express();
const AWS = require('aws-sdk');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: 'teachIn',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', rootRouter);
app.get('/bundle.js', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});
app.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

//app.get('/api', function(req,res){res.send('i made it')});
app.listen(process.env.PORT || PORT, () => console.log('Server running on port', PORT));
