const express = require('express');
const app = express();
const port = 3000;
 const mongoose = require('mongoose');
const cors = require('cors');

// connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// define the cart schema
const cartSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  qty: Number
});

// create a model for the cart
const Cart = mongoose.model('Cart', cartSchema);

// setup routes
app.use(express.static('public')); // serve static files from public folder
app.use(express.json()); // parse JSON bodies
app.use(cors()); // enable CORS

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/cart', async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving cart data' });
  }
});

app.post('/api/checkout', async (req, res) => {
  try {
    const { firstName, lastName, email, address, country, state, zip, paymentMethod } = req.body;
    // validate and process payment
    // ...
    res.json({ message: 'Checkout successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error processing checkout' });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});