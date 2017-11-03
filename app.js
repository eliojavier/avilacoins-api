let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let cors = require('cors');

let db = require('./db');

let index = require('./routes/index');
let accounts = require('./routes/accounts');
let admin = require('./routes/admin');
let affiliates = require('./routes/affiliates');
let banks = require('./routes/banks');
let bankAccounts = require('./routes/bankAccounts');
let commerceTypes = require('./routes/commerceTypes');
let contacts = require('./routes/contacts');
let locations = require('./routes/locations');
let promotions = require('./routes/promotions');
let rates = require('./routes/rates');
let transactions = require('./routes/transactions');
let transfers = require('./routes/transfers');
let users = require('./routes/users');
//Admin routes
let adminPromotions = require('./routes/admin/promotions');
let adminTransactions = require('./routes/admin/transactions');
let adminAffiliates = require('./routes/admin/affiliates');
let adminLogs = require('./routes/admin/logs');
let adminReports = require('./routes/admin/reports');
let adminUsers = require('./routes/admin/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/', index);
app.use('/accounts', accounts);
app.use('/admin', admin);
app.use('/affiliates', affiliates);
app.use('/banks', banks);
app.use('/bank-accounts', bankAccounts);
app.use('/commerce-types', commerceTypes);
app.use('/contacts', contacts);
app.use('/locations', locations);
app.use('/promotions', promotions);
app.use('/rates', rates);
app.use('/transactions', transactions);
app.use('/transfers', transfers);
app.use('/users', users);
//Admin routes
app.use('/admin/promotions', adminPromotions);
app.use('/admin/transactions', adminTransactions);
app.use('/admin/affiliates', adminAffiliates);
app.use('/admin/logs', adminLogs);
app.use('/admin/reports', adminReports);
app.use('/admin/users', adminUsers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
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

if (app.get('env') === 'production') {
  app.listen(3000);
}

module.exports = app;
