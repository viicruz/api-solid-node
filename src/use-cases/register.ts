import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6);

  const usersWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (usersWithSameEmail) {
    throw new Error("User already exists");
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });
}
