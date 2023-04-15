import { it, describe, expect, beforeEach, vi, afterEach } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/In-memory/in-memory-checkins-repository";
import { CheckInUseCase } from "./check-in";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Check in Use Case", () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(inMemoryCheckInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
  it("should not be able to check in twice in a same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
    });

    expect(
      async () =>
        await sut.execute({
          userId: "user-01",
          gymId: "gym-01",
        })
    ).rejects.toBeInstanceOf(Error);
  });
  it("should  be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
    });
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));
    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});