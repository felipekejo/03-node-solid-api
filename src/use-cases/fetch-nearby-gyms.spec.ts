import { InMemoryGymsRepository } from "@/repositories/In-memory/in-memory-gyms-repository";
import { it, describe, expect, beforeEach } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gym";

let inMemoryGymsRepository: InMemoryGymsRepository;

let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(inMemoryGymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await inMemoryGymsRepository.create({
      title: "Near Gym",
      latitude: -34.9686588,
      longitude: 138.5687609,
      description: null,
      phone: null,
    });

    await inMemoryGymsRepository.create({
      title: "Far Gym",
      latitude: -35.7742922,
      longitude: 141.6168361,
      description: null,
      phone: null,
    });

    const { gyms } = await sut.execute({
      userLatitude: -34.9686588,
      userLongitude: 138.5687609,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
