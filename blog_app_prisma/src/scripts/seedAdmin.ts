import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";

async function seedAdmin() {
  try {
    console.log("********* admin seeding started!!!...");
    const adminData = {
      name: "Admin1 Saheb",
      email: "admin1@admin.com",
      role: UserRole.ADMIN,
      password: "admin1234",
    };
    console.log("********Checking admin exists or not");
    // we will check if the user is there in DB
    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existingUser) {
      throw new Error("User already Exists in DB!!!");
    }
    const signUpAdmin = await fetch(
      "http://localhost:3000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      }
    );
    // admin created now  we  are going to update
    console.log("Admin created");
    if (signUpAdmin.ok) {
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });
      console.log("###  email verified");
    }
    console.log("** success");
  } catch (error) {
    console.error(error);
  }
}
seedAdmin();
