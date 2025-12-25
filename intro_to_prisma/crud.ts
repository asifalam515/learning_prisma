import { prisma } from "./lib/prisma";

async function run() {
  // update user data
  const updateUser = await prisma.profile.update({
    where: {
      userId: 1,
    },
    data: {
      bio: "we are going to get married in feb",
    },
    select: {
      id: true,
      bio: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  console.log("users", updateUser);
}
run();
