const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
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
