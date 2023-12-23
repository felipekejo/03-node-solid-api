import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-in-history-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryBodySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryBodySchema.parse(request.query);

  const fetchCheckInHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();
  const { checkIns } = await fetchCheckInHistoryUseCase.execute({
    page,
    userId: request.user.sub,
  });

  return reply.status(201).send({
    checkIns,
  });
}
