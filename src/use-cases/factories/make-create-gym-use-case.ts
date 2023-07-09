import { CreateGymUseCase } from "../create-gym";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-respository";

export function makeCreateGymUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const useCase = new CreateGymUseCase(prismaGymsRepository);

  return useCase;
}
