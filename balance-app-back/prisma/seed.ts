import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const passwordHash = await hash("Admin1", 10);

    const user = {
        email: "admin@teste.com",
        password: passwordHash
    }

    await prisma.user.create({
        data: {
            email: user.email,
            password: user.password
        }
    })
}

main()