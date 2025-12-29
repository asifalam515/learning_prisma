import app from "./app";
import { prisma } from "./lib/prisma";
const port = process.env.PORT || 5000;

async function main() {
  try {
    await prisma.$connect();
    console.log("connected to db successfully");
    // application location will be here
    app.listen(port, () => {
      console.log("Server is running on ", port);
    });
  } catch (error: any) {
    console.log("An error occurred", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
