const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const Order = require("../models/Order");
const Cocktail = require("../models/Cocktail");
const stripe = require("stripe")(
  "sk_test_51IyK20SBqsh0Zyo7YxHpTSrpyFwEjuo3YFcYOTVM6bW2d0pxydYtF6oFecMwL0xt6vnVoQyGBRo5mHRG73duXZCY00WFzVQIyz"
);

const router = express.Router();

const YOUR_DOMAIN = "http://localhost:3000/checkout";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private

router.post("/", protect, async (req, res) => {
  try {
    const { orderItem, paymentMethod, totalPrice } = req.body;
    // console.log(req.user, "user");

    if (orderItem === {}) {
      res.status(400);
      throw new Error("No order items");
      return;
    } else {
      const order = new Order({
        orderItem,
        user: req.user.id,
        paymentMethod,
        totalPrice,
      });

      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private

// router.get("/:id", protect, async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate(
//       "user",
//       "name email"
//     );

//     if (order) {
//       res.json(order);
//     } else {
//       res.status(404);
//       throw new Error("Order not found");
//     }
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server error");
//   }
// });

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private

router.put("/:id/pay", protect, async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private

router.get("/myorders", protect, async (req, res) => {
  console.log(req.user, "my orders");

  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin

router.get("/", protect, admin, async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name email");
  res.json(orders);
});

router.post("/create-checkout-session/:id", protect, async (req, res) => {
  const cocktail = await Cocktail.findById(req.params.id);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `${cocktail.name}`,
            images: [`${cocktail.image}`],
          },
          unit_amount: cocktail.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/error`,
  });
  res.json({ id: session.id });
});

module.exports = router;
