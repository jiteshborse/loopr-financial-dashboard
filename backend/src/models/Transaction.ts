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

// Performance compound indexes for sorting and filtering
transactionSchema.index({ category: 1, date: -1 });
transactionSchema.index({ status: 1, date: -1 });
transactionSchema.index({ user_id: 1, date: -1 });
transactionSchema.index({ date: -1, _id: 1 });

export type TransactionDocument = InferSchemaType<typeof transactionSchema>;

export const Transaction = model("Transaction", transactionSchema);
export default Transaction;
