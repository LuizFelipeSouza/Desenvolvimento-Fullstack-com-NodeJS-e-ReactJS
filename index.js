// require() é como um import
const express = require('express');
// O mongoose modela objetos de nossa aplicação para o MongoDB
// É como um ORM
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
// requisitamos o passport.js deste projeto
require('./services/passport');

// Especificamos o banco de dados MongoDB ao qual o mongoose se conectará
mongoose.connect(keys.mongoURI);

const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [ keys.cookieKey ]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);