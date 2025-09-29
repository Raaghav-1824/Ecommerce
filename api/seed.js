// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import { faker } from '@faker-js/faker';

// import User from './models/User.js';
// import Product from './models/Product.js';
// import Order from './models/Order.js';

// dotenv.config();
// mongoose.connect(process.env.MONGO_URL)
//   .then(() => console.log("MongoDB connected"))
//   .catch(console.error);

// // Generate fake users
// const generateUsers = (count = 5) => {
//   return Array.from({ length: count }, () => ({
//     username: faker.internet.userName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//     isAdmin: faker.datatype.boolean()
//   }));
// };

// // Generate fake products
// const generateProducts = (count = 10) => {
//   return Array.from({ length: count }, () => ({
//     title: faker.commerce.productName(),
//     desc: faker.commerce.productDescription(),
//     price: faker.datatype.number({ min: 500, max: 5000 }),
//     inStock: faker.datatype.boolean()
//   }));
// };

// // Generate fake orders
// const generateOrders = (userIds, count = 5) => {
//   return Array.from({ length: count }, () => ({
//     userId: faker.helpers.arrayElement(userIds),
//     amount: faker.datatype.number({ min: 1000, max: 10000 }),
//     status: faker.helpers.arrayElement(["pending", "completed", "shipped"])
//   }));
// };

// // Main seeding function
// const seedData = async () => {
//   try {
//     await User.deleteMany();
//     await Product.deleteMany();
//     await Order.deleteMany();

//     const users = await User.insertMany(generateUsers(5));
//     const products = await Product.insertMany(generateProducts(10));
//     const orders = await Order.insertMany(generateOrders(users.map(u => u._id), 7));

//     console.log("✅ Seeded Users, Products, and Orders.");
//   } catch (error) {
//     console.error(error);
//   } finally {
//     mongoose.disconnect();
//   }
// };

// seedData();
