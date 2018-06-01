// require() é como um import
const express = require('express');
// passport é um middleware para autenticação oauth
const passport = require('passport');
// O passport utiliza "Estratégias" para cada provedor, como Google ou GitHub
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// Chaves definidas em keys.js
const keys = require('./config/keys');

const app = express();

// Configuramos o passport para utilizar a GoogleStrategy
// Configuramos o GoogleStrategy com as chaves da API OAuth
// Configuramos o endereço de callback, para o qual redirecionaremos o usuário autenticado
passport.use(new GoogleStrategy(
	{
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	},
	accessToken => {
		console.log(accessToken);
	}
));

app.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);