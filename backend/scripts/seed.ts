import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import { connectDatabase, disconnectDatabase } from "../src/config/database";
import { Transaction } from "../src/models/Transaction";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type RawTransaction = {
  id: number;
  date: string;
  amount: number;
  category: "Revenue" | "Expense";
  status: "Paid" | "Pending";
  user_id: string;
  user_profile: string;
};

function validateTransaction(value: unknown, index: number): asserts value is RawTransaction {
  if (!value || typeof value !== "object") {
    throw new Error(`Transaction at index ${index} is not an object.`);
  }

  const tx = value as Partial<RawTransaction>;

  if (
    typeof tx.id !== "number" ||
    typeof tx.date !== "string" ||
    typeof tx.amount !== "number" ||
    !["Revenue", "Expense"].includes(tx.category ?? "") ||
    !["Paid", "Pending"].includes(tx.status ?? "") ||
    typeof tx.user_id !== "string" ||
    typeof tx.user_profile !== "string"
  ) {
    throw new Error(`Invalid transaction at index ${index}.`);
  }

  if (Number.isNaN(Date.parse(tx.date))) {
    throw new Error(`Invalid date at index ${index}.`);
  }

  if (!Number.isFinite(tx.amount)) {
    throw new Error(`Invalid amount at index ${index}.`);
  }
}

async function seed() {
  try {
    const filePath = path.resolve(__dirname, "../../data/transactions.json");
    const file = await fs.readFile(filePath, "utf-8");
    const raw: unknown = JSON.parse(file);

    if (!Array.isArray(raw)) {
      throw new Error("transactions.json must contain an array.");
    }

    raw.forEach(validateTransaction);

    const transactions = raw.map((tx) => ({
      id: tx.id,
      date: new Date(tx.date),
      // Convert the source number to a string before creating Decimal128.
      // This avoids introducing a binary floating-point representation
      // into the database layer.
      amount: mongoose.Types.Decimal128.fromString(tx.amount.toFixed(2)),
      category: tx.category,
      status: tx.status,
      user_id: tx.user_id,
      user_profile: tx.user_profile
    }));

    await connectDatabase();

    console.log(`Found ${transactions.length} transactions in JSON.`);
    console.log("Clearing existing transaction documents...");
    await Transaction.deleteMany({});

    console.log("Inserting transactions into MongoDB...");
    await Transaction.insertMany(transactions, { ordered: true });

    const count = await Transaction.countDocuments();

    console.log(`Seed completed successfully. MongoDB now contains ${count} transactions.`);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await disconnectDatabase();
  }
}

seed();
