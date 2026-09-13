import { Schema, model, type InferSchemaType } from "mongoose";

const transactionSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true
    },
    date: {
      type: Date,
      required: true,
      index: true
    },
    amount: {
      type: Schema.Types.Decimal128,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ["Revenue", "Expense"],
      index: true
    },
    status: {
      type: String,
      required: true,
      enum: ["Paid", "Pending"],
      index: true
    },
    user_id: {
      type: String,
      required: true,
      index: true
    },
    user_profile: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export type TransactionDocument = InferSchemaType<typeof transactionSchema>;

export const Transaction = model("Transaction", transactionSchema);
