const Stripe = require("stripe");
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

const handleCheckout = async (req, res) => {
  const { paymentMethod, amount, address, city } = req.body;

  try {
    const { id } = paymentMethod;
    const payment = await stripe.paymentIntents.create({
      payment_method: id,
      amount,
      currency: "usd",
      confirm: true,
      description: "",
    });

    return res.status(201).json({ message: "success", payment, address, city });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { handleCheckout };
