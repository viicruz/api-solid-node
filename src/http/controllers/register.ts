import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);
  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  });
  return reply.status(201).send();
}
