import { prisma } from "./lib/prisma";

async function run() {
  //   const cerateUser = await prisma.user.create({
  //     data: {
  //       name: "Sahanur Eva",
  //       email: "eva@gmail.com",
  //     },
  //   });
  //   const createPost = await prisma.post.create({
  //     data: {
  //       title: "Why you get married first",
  //       content: "getting married  helps you",
  //       authorId: 1,
  //     },
  //   });
  const createProfile = await prisma.profile.create({
    data: {
      bio: "this is dev at programming hero",
      userId: 1,
    },
  });
  console.log("Created profile", createProfile);
}
run();
