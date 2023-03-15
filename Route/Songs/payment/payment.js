import braintree from "braintree";
import express from "express";

var app = express.Router();
// Initialize Braintree gateway with your API credentials
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, // change to Production for live payments
  merchantId: "yfxkyvmm4gmx8qpn",
  publicKey: "k4w7wwkqp7jsp2xk",
  privateKey: "cec16e63301015076ea4d6992ad50ea5",
});

// Generate a client token to be used on the client-side
app.get("/api/getClientToken", async (req, res) => {
  try {
    const { clientToken } = await gateway.clientToken.generate();
    res.set("Access-Control-Allow-Origin", "*").json({ clientToken });
  } catch (err) {
    console.error(err);
    res
      .set("Access-Control-Allow-Origin", "*")
      .status(500)
      .json({ error: "Failed to generate client token" });
  }
});

// Process a payment with the provided nonce and amount
app.post("/api/processPayment", async (req, res) => {
  const { amount, paymentMethodNonce } = req.body;

  try {
    const result = await gateway.transaction.sale({
      amount,
      paymentMethodNonce,
      options: {
        submitForSettlement: true,
      },
    });
    if (result.success) {
      console.log(result);
      res
        .set("Access-Control-Allow-Origin", "*")
        .status(200)
        .json({ message: "Paid Successfully" });
    } else {
      console.error(result);
      res
        .set("Access-Control-Allow-Origin", "*")
        .status(400)
        .json({ error: "Failed Payment" });
    }
  } catch (err) {
    console.error(err);
    res
      .set("Access-Control-Allow-Origin", "*")
      .status(500)
      .json({ error: "Failed to process payment" });
  }
});

export const appPay = app;
