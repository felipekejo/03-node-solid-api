import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-respository";
import { SearchGymsUseCase } from "../search-gyms";

export function makeSearchGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymsUseCase(prismaGymsRepository);

  return useCase;
}
