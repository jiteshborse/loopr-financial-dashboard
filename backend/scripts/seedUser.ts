import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDatabase, disconnectDatabase } from "../src/config/database";
import { User } from "../src/models/User";

async function seedUser() {
    try {
        await connectDatabase();

        const email = "analyst@loopr.dev";
        const password = "Loopr@12345";

        const passwordHash = await bcrypt.hash(password, 12);

        await User.findOneAndUpdate(
            { email },
            {
                email,
                passwordHash,
                role: "analyst"
            },
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }
        );

        console.log("Demo analyst user created/updated.");
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
    } catch (error) {
        console.error("User seed failed:", error);
        process.exitCode = 1;
    } finally {
        await disconnectDatabase();
    }
}

seedUser();
