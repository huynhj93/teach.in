var authMiddleware = {};
const Student = require('../models/student_model');
const bcrypt = require('bcryptjs');

authMiddleware.isValidEmail = function (req, res, next) {
	Student.findOne({
		where: { email: req.body.email, },
	})
	.then((student) => {
		if (student !== null) {
			res.status(400).send('That email is already regisstered');
		} else {
			next();
		}
	})
	.catch((err) => {
		res.status(500).send(err);
	});
};

authMiddleware.hashPassword = function (req, res, next) {
	bcrypt.hash(req.body.password, 10, (err, hash) => {
		if (err) {
			res.err(err);
		} else {
			req.body.password = hash;
			next();
		}
	});
};

authMiddleware.checkSignIn = function (req, res, next) {
	if (req.session.email) {
		next();
	} else {
		var err = new Error('Not logged in!');
		console.log('trying to access unauthorized page!', req.session.email);
		next(err);
	}
};

authMiddleware.verifyPassword = function (req, res, next) {
	if (!req.body.email || !req.body.password) {
		res.send('please enter email and password');
	} else {
		Student.findOne({
			where: { email: req.body.email },
		})
		.then((student) => {
			console.log('req.body.password should be:', req.body.password);
			console.log('student password is:', student.password);
			bcrypt.compare(req.body.password, student.password, (err, response) => {
				var isCorrectPassword = response;
				if (err) {
					res.status(500).send(err);
				} else if (isCorrectPassword) {
					console.log('the response is:', response);
					req.session.email = req.body.email;
					next();
				} else {
					res.status(400).send('Invalid email or password');
				}
			});
		})
		.catch((err) => {
			console.log('err in auth verify password');
			res.send(err);
		});
	}
};

module.exports = authMiddleware;
