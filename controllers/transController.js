const Transactions = require('../models/transactions');

exports.postTrans = async (req, res) => {
  const { userId } = req.params; 
  const { income, description, expenses } = req.body;

  try {
    let transaction = await Transactions.findOne({ userId });

    if (transaction) {
      return res.status(400).json({ message: "User already has a transaction. Please update or delete existing transaction." });
    }

    transaction = new Transactions({
      userId,
      income,
      description,
      expenses: []
    });

    for (const expense of expenses) {
      transaction.expenses.push(expense);
    }

    await transaction.save();

    res.status(201).json({ message: "Transaction created successfully" });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.postExpenses = async (req, res) => {
  const userId = req.params.userId; 
  const { category, amount, description } = req.body; 

  try {
    const transaction = await Transactions.findOne({ userId });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    transaction.expenses.push({ category, amount, description });

    await transaction.save();

    res.status(201).json({ message: "Expense successfully added" });
  } catch (error) {
    console.error("Error adding the new expense:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.getTrans = async (req, res) => {
  const { userId } = req.params;

  try {
    const transaction = await Transactions.findOne({ userId });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ transaction });
  } catch (error) {
    console.error("Error fetching transaction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};