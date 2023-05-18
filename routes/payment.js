const { Router } = require('express');
const controller = require('../controllers/payments.controller');

const payment = new Router();

payment.post('/payment', controller.payment);

module.exports = payment;
