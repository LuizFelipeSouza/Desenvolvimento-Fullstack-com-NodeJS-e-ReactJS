// passport é um middleware para autenticação oauth
const passport = require('passport');
// O passport utiliza "Estratégias" para cada provedor, como Google ou GitHub
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
// Chaves definidas em keys.js
const keys = require('../config/keys');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	// user.id é o id do registro no banco de dados, não o google profile id
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

// Configuramos o passport para utilizar a GoogleStrategy
// Configuramos o GoogleStrategy com as chaves da API OAuth
// Configuramos o endereço de callback, para o qual redirecionaremos o usuário autenticado
passport.use(new GoogleStrategy(
	{
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	},
	(accessToken, refreshToken, profile, done) => {
		// Verificamos se já há algum registro com o ID
		User.findOne({ googleID: profile.id })
			.then((existingUser) => {
				if(existingUser) {
					// se o usuário existe, não faça nada.
					// done() tem um objeto err como primeiro argumento.
					// Neste caso, não há erros. 
					done(null, existingUser);
				} else {
					// do contrário, persista este novo usúário
					new User({ googleID: profile.id })
					    .save()
					    .then(user => done(null, user));
				}
			})
		// new User({ googleID: profile.id }).save();
		// console.log('access token', accessToken);
		// console.log('refresh token', refreshToken);
		console.log('profile:', profile);
	}
));