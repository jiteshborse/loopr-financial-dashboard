import { Schema, model, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            default: "Jitesh Borse",
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["analyst"],
            default: "analyst"
        },
        location: {
            type: String,
            default: "Pune, Maharashtra",
            trim: true
        },
        title: {
            type: String,
            default: "Senior Financial Analyst",
            trim: true
        },
        lastLogin: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export type UserDocument = InferSchemaType<typeof userSchema>;

export const User = model("User", userSchema);
export default User;
