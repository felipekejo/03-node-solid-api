import { InMemoryGymsRepository } from "@/repositories/In-memory/in-memory-gyms-repository";
import { it, describe, expect, beforeEach } from "vitest";
import { CreateGymUseCase } from "./create-gym";

let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(inMemoryGymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "JavaScript Gym",
      latitude: -34.9686588,
      longitude: 138.5687609,
      description: null,
      phone: null,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
