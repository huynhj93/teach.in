const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const rootRouter = require('./routers/root_router');
const PORT = 8000;
const app = express();
const sequelize = require('./database').sequelize;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
  secret: 'teachIn',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));
app.use(express.static(path.join(__dirname, '../public')));

//app.get('/api', function(req,res){res.send('i made it')});
app.use('/api', rootRouter);
app.listen(PORT, () => console.log('Server running on port', PORT));
