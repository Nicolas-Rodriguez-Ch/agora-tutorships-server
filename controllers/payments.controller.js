const stripe = require("./stripe");
const Student = require("../models/student.model");
const Tutor = require("../models/tutor.model");
const Payment = require("../models/payment.model");
const Tutorship = require("../models/tutorship.model");

const { handleCheckout } = require("./stripe");

async function payment(req, res) {
  const { tutorship_id, cardInfo, customerInfo, user_id, currentPaymentData } = req.body;
  try {
    const tutorship = await Tutorship.findById(tutorship_id).exec();
    if (!tutorship) {
      return res.status(404).json({ message: "Tutorship not found" });
    }

    const tutor = await Tutor.findById(tutorship.tutor_id).exec();
    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    const price = parseInt(tutor.price);
    if (isNaN(price)) {
      console.log("Lets go nuggies");
      return res.status(400).json({ message: "Invalid tutor price" });
    }

    const amount = price * 100;

    console.log("About to call handleCheckout");
    const paymentResponse = await handleCheckout(req);
    console.log("handleCheckout result:", paymentResponse);

    const newPayment = new Payment({
      amount: amount,
      invoice: "",
      stripe_payment_intent_id: "",
      stripe_customer_id: "",
      ...paymentResponse.payment,
      student_id: user_id,
    });

    const payment = await newPayment.save();

    // Update the status of the tutorship
    tutorship.status = "accepted";
    await tutorship.save();

    res.status(201).json({ payment, tutorship, message: paymentResponse.message, address: paymentResponse.address, city: paymentResponse.city });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

module.exports = { payment };
