// passport faz a comunicação com o GoogleOAuth
const passport = require('passport');

// roteamos todas ass requisões de /auth/google para a autenticação GoogleOAuth
module.exports = app => {
	/**
	 * O método get recebe como primeiro argumento o endereço que será monitorado e
	 * a função que será executada, como segundo.
	 **/
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google'));

	app.get('/api/logout', (req, res) => {
		// A função logout desativa o cookie relacionado ao usuário logado
		req.logout();
		res.send(req.user);
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};