import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-respository";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gym";

export function makeFetchNearbyGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(prismaGymsRepository);

  return useCase;
}
