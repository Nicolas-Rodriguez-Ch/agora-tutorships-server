const Stripe = require("stripe");
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

const handleCheckout = async (req) => {
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

    return { message: "success", payment, address, city };
  } catch (error) {
    console.error("🚀 ~ file: stripe.js:23 ~ handleCheckout ~ error:", error);
    throw error;
  }
};

module.exports = { handleCheckout, stripe };
