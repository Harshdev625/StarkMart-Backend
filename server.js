const dotenv =require('dotenv')
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors')
const productsRouter = require('./routes/productroutes');
const brandsRouter = require('./routes/brandroutes');
const categoriesRouter = require('./routes/categoryroutes');
const userRouter = require('./routes/userroutes')
const authRouter = require('./routes/authroutes')
const cartRouter=require('./routes/cartroutes')
const orderRouter=require('./routes/orderroutes')
dotenv.config();
server.use(express.json()); // to parse req.body
main().catch((err) => console.error(err));

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
server.use(cors())
server.use('/products', productsRouter.router);
server.use('/categories', categoriesRouter.router);
server.use('/brands', brandsRouter.router);
server.use('/user', userRouter.router);
server.use('/auth', authRouter.router);
server.use('/cart',cartRouter.router)
server.use('/order',orderRouter.router)

server.get('/', (req, res) => {
  res.json({ success: 'success' });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
