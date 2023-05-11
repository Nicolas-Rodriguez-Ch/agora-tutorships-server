const stripe = require('./stripe');
const Student = require('../models/student.model');
const Payment = require('../models/payment.model');
const Tutorship = require('../models/tutorship.model');

const { handleCheckout } = require('./stripe');

async function payment(req, res) {
  const {
    tutorship_id,
    cardInfo,
    customerInfo,
    user_id,
    paymentInfo,
    currentPaymentData,
  } = req.body;
  try {
    // Create a payment
    const paymentResponse = await handleCheckout({
      paymentMethod: cardInfo,
      amount: paymentInfo.amount,
      address: customerInfo.address,
      city: customerInfo.city,
    });

    // If payment is successful, save it to the database
    const newPayment = new Payment({
      ...paymentResponse.payment,
      student_id: user_id,
    });
    const payment = await newPayment.save();

    // Update the status of the tutorship
    const filterTutorship = { _id: tutorship_id };
    const updateTutorship = { status: 'accepted' };
    const updatedTutorship = await Tutorship.updateOne(filterTutorship, updateTutorship);

    res.status(201).json({ payment, updatedTutorship });
  } catch (error) {
    res.status(500).send(error.message);
  }
}


module.exports
 = { payment };
