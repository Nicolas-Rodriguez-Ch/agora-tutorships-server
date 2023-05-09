const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    stripe_customer_id: {
      type: String,
      required: true,
    },
    stripe_payment_intent_id: {
      type: String,
      unique: true,
      required: true,
    },
    invoice: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
    },
    net_value: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const Payment = mongoose.model('payments', PaymentSchema);

module.exports = Payment;