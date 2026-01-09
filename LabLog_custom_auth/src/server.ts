import app from "./app";
import { prisma } from "./lib/prisma";
const PORT = process.env.PORT || 3000;
async function server() {
  try {
    await prisma.$disconnect();
  } catch (error: any) {
    console.log("Error Occurs ", error);
    await prisma.$disconnect();
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`Lablog Server is running on port ${PORT}`);
  });
}
server();
