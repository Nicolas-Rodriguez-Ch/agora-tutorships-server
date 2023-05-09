const Student = require('../models/student.model');
const Tutor = require('../models/tutor.model');
const jwt = require('jsonwebtoken');

const logger = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userAuth = await Student.authenticate(email, password) || await Tutor.authenticate(email, password);
        let user = null;
        if (userAuth) {
            const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 15 * 24 * 60 * 60, userId: userAuth._id, type: `${userAuth.focus ? "tutor" : "student"}`, userData: userAuth }, 'secret key');
            user = { token, userData: userAuth };
        } else {
            res.status(404).send('Not found');
            return;
        }
        res.json(user);
        next();
    } catch (error) {
        res.status(500).send('server error');
        next(error);
    }
}

module.exports = logger;