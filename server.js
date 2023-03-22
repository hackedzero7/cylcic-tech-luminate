const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/error");
const colors = require("colors");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const rateLimit = require("express-rate-limit");
// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51MMhj4JX9pVYcKSoC8qVBxRQ0PI8n45lXJvc3CCZplUN7sYVVxNDT5tsfNQwl0wlcypc4j8ZZ3JDdIsh8VYQU1gL009pq3wXVZ"
);

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to Database
connectDB();
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const app = express();

app.use(express.json());

// Cookie parser
app.use(cookieParser());
// Dev logging niddleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Sanitize Data
app.use(mongoSanitize());
// Enable cors

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(helmet.contentSecurityPolicy({
  directives: {
    ...helmet.contentSecurityPolicy.getDefaultDirectives(),
    'default-src': ["'self'"],
    'script-src': ["'self'", "https://js.stripe.com/v3"],

  },
}));

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

// Mount routers
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-customer", async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;
    const customer = await stripe.customers.create({
      email: email,
      name: `${firstName} ${lastName}`,
    });

    res.json({ customer: customer });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.post("/create-subscription", async (req, res) => {
  const { customerId, price } = req.body;
  const priceId = price;
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: priceId,
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });

    res.send({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }

  // try {
  //   const { email, payment_method, price } = req.body;
  //   let subscription;
  //   const customer = await stripe.customers.create({
  //     payment_method: payment_method,
  //     email: email,
  //     invoice_settings: {
  //       default_payment_method: payment_method,
  //     },
  //   });

  //   subscription = await stripe.subscriptions.create({
  //     customer: customer.id,
  //     items: [{ price: price }],
  //     expand: ["latest_invoice.payment_intent"],
  //   });

  //   console.log(subscription);

  //   const status = subscription["latest_invoice"]["payment_intent"]["status"];
  //   const client_secret =
  //     subscription["latest_invoice"]["payment_intent"]["client_secret"];

  //   res.json({ client_secret: client_secret, status: status });
  // } catch (error) {
  //   res.json({ error: error.message });
  // }
});

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

// app.use('/', (req, res)=>{
//   res.send('api is working fine')
// })
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

process.on(PORT, (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & Exit process
  server.close(() => process.exit(1));
});
