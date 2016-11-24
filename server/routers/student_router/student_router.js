const studentRouter = require('express').Router();
const authMiddleware = require('../../middlewares/studentAuth.js');
const studentController = require('../../controllers/student_controller');
const getAllEvents = require('../../controllers/student_controller').getAllEvents;
const studentClassRouter = require('./classes_router/student_classes_router');



studentRouter.route('/signup')
.post(authMiddleware.isValidEmail, authMiddleware.hashPassword, studentController.SIGNUP);

studentRouter.route('/signin')
.post(authMiddleware.verifyPassword, studentController.SIGNIN);

studentRouter.route('/signout')
.get(studentController.SIGNOUT);

studentRouter.route('/')
.get(studentController.GETSTUDENTS);
module.exports = studentRouter;

studentRouter.route('/init')
.get(studentController.GETSTUDENT);
module.exports = studentRouter;

studentRouter.route('/resources')
.get(studentController.studentResources);
module.exports = studentRouter;

studentRouter.route('/event')
.get(authMiddleware.checkSignIn, getAllEvents);

studentRouter.use('/classes', studentClassRouter);

module.exports = studentRouter;
