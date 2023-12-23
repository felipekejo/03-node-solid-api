import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.body);

  const nearbyGymsUseCase = makeNearbyGymsUseCase();
  const { gyms } = await nearbyGymsUseCase.execute({
    latitude,
    longitude,
  });

  return reply.status(201).send({ gyms });
}
