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
      date,
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
      return res
        .status(404)
        .json({ message: "No transactions found for this user" });
    }

    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteTrans = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const deletedTransaction = await Transactions.findByIdAndDelete(
      transactionId
    );

    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateTrans = async (req, res) => {
  const { transactionId } = req.params;
  const updates = req.body;

  try {
    const updatedTransaction = await Transactions.findByIdAndUpdate(
      transactionId,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction updated successfully",
      transaction: updatedTransaction,
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUserBalance = async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await Transactions.find({ userId });
    let balance = 0;
    transactions.forEach((trans) => {
      if (trans.type === "income") {
        balance += trans.amount;
      } else {
        balance -= trans.amount;
      }
    });
    res.status(200).json({ balance });
  } catch (error) {
    console.error("Error fetching user balance:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
