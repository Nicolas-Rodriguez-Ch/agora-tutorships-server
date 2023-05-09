const { Router } = require('express');
const controller = require('../controllers/payments.controller');

const payment = new Router();

payment.post('/payment', controller.payment);
payment.post('/create-card', controller.addCard);
payment.post('/delete-card', controller.deleteCard);
payment.get('/get-customer', controller.getCustomer);

module.exports = payment;
