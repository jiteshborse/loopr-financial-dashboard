import { Schema, model, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
    {
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
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export type UserDocument = InferSchemaType<typeof userSchema>;

export const User = model("User", userSchema);