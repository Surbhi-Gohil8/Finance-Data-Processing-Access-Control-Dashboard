require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user.model');
const Transaction = require('./models/transaction.model');
const connectDB = require('./config/db');

const seedData = async () => {
  await connectDB();

  try {
    // Clear existing data
    await User.deleteMany();
    await Transaction.deleteMany();

    // Create Admin User
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@finance.com',
      password: 'password123',
      role: 'admin',
    });

    // Create Analyst User
    const analyst = await User.create({
      name: 'Analyst User',
      email: 'analyst@finance.com',
      password: 'password123',
      role: 'analyst',
    });

    // Create Viewer User
    const viewer = await User.create({
      name: 'Viewer User',
      email: 'viewer@finance.com',
      password: 'password123',
      role: 'viewer',
    });

    // Add Transactions
    await Transaction.create([
      { amount: 5000, type: 'income', category: 'Salary', createdBy: admin._id },
      { amount: 1200, type: 'income', category: 'Freelance', createdBy: analyst._id },
      { amount: 300, type: 'expense', category: 'Groceries', createdBy: admin._id },
      { amount: 1500, type: 'expense', category: 'Rent', createdBy: admin._id },
      { amount: 50, type: 'expense', category: 'Entertainment', createdBy: viewer._id },
    ]);

    console.log('Seed data inserted successfully');
    process.exit();
  } catch (err) {
    console.error('Error with seed data', err);
    process.exit(1);
  }
};

seedData();
