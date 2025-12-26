import { prisma } from "./lib/prisma";

async function main() {
  //read data
  const user = await prisma.user.findMany();
  console.log("retrieve all  users ", user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
