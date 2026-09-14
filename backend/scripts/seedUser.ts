import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDatabase, disconnectDatabase } from "../src/config/database";
import { User } from "../src/models/User";

async function seedUser() {
    try {
        await connectDatabase();

        const email = "analyst@loopr.dev";
        const password = "Loopr@12345";
        const name = "Jitesh Borse";
        const location = "Pune, Maharashtra";
        const title = "Senior Financial Analyst";

        const passwordHash = await bcrypt.hash(password, 12);

        await User.findOneAndUpdate(
            { email },
            {
                name,
                email,
                passwordHash,
                role: "analyst",
                location,
                title,
                lastLogin: new Date(),
            },
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }
        );

        console.log("Demo analyst user created/updated with profile details.");
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Location: ${location}`);
        console.log(`Title: ${title}`);
    } catch (error) {
        console.error("User seed failed:", error);
        process.exitCode = 1;
    } finally {
        await disconnectDatabase();
    }
}

seedUser();
