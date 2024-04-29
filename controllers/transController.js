const Transactions = require("../models/transactions");

exports.postTrans = async (req, res) => {
  const { userId } = req.params;
  const { type, amount, description, date } = req.body;

  try {
    const transaction = new Transactions({
      userId,
      type,
      amount,
      description,
      date
    });

    await transaction.save();

    res.status(201).json({ message: "Transaction created successfully" });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.getTrans = async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await Transactions.find({ userId });

    if (transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found for this user" });
    }

    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

