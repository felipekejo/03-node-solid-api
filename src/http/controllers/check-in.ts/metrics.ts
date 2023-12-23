import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const fetchCheckInHistoryUseCase = makeGetUserMetricsUseCase();
  const { checkInsCount } = await fetchCheckInHistoryUseCase.execute({
    userId: request.user.sub,
  });

  return reply.status(201).send({
    checkInsCount,
  });
}
