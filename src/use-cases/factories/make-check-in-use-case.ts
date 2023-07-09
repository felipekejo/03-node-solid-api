import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-respository";
import { CheckInUseCase } from "../check-in";

import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new CheckInUseCase(prismaCheckInsRepository, gymsRepository);

  return useCase;
}
