const stripe = require('./stripe');
const Student = require('../models/student.model');
const Payment = require('../models/payment.model');
const Tutorship = require('../models/tutorship.model');

async function addCard(req, res) {
  const { stripeCustomerId, cardInfo } = req.body;
  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: cardInfo,
    });

    await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: stripeCustomerId,
    });

    res.status(201).json({ updatedCustomer: paymentMethod });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteCard(req, res) {
  const { cardId } = req.body;
  try {
    const deletedCard = await stripe.paymentMethods.detach(cardId);
    res.status(201).json({ customer: deletedCard });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getCustomer(req, res) {
  const { id } = req.query;
  try {
    const student = await Student.findOne({ _id: id });
    const { stripe_customer_id: stripeCustomerId } = student;
    const customer = await stripe.customers.retrieve(stripeCustomerId);
    res.status(201).json({ customer });
  } catch (error) {
    console.error('Error in getCustomer:', error);
    res.status(500).send(error);
  }
}


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
    if (!currentPaymentData) {
      const customer = await stripe.customers.create({
        ...customerInfo,
      });

      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: cardInfo,
      });

      await stripe.paymentMethods.attach(paymentMethod.id, {
        customer: customer.id,
      });

      const charge = await stripe.charges.create({
        ...paymentInfo,
        customer: customer.id,
        source: paymentMethod.id,
      });

      const filter = { _id: user_id };
      const update = { stripe_customer_id: customer.id };
      const updatedStudent = await Student.updateOne(filter, update);

      const newPayment = new Payment({
        ...charge,
        student_id: user_id,
        stripe_customer_id: customer.id,
      });
      const payment = await newPayment.save();

      const filterTutorship = { _id: tutorship_id };
      const updateTutorship = { status: 'accepted' };
      const updatedTutorship = await Tutorship.updateOne(filterTutorship, updateTutorship);

      res.status(201).json({ payment, updatedStudent, updatedTutorship });
    } else {
      const charge = await stripe.charges.create(currentPaymentData);

      const newPayment = new Payment({
        ...charge,
        student_id: user_id,
        stripe_customer_id: currentPaymentData.customer,
      });
      const payment = await newPayment.save();

      const filterTutorship = { _id: tutorship_id };
      const updateTutorship = { status: 'accepted' };
      const updatedTutorship = await Tutorship.updateOne(filterTutorship, updateTutorship);

      res.status(201).json({ payment, updatedTutorship });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports
 = { payment, addCard, getCustomer, deleteCard };
