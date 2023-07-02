import { it, describe, expect, beforeEach, vi, afterEach } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/In-memory/in-memory-checkins-repository";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;

let sut: ValidateCheckInUseCase;

describe("Validate Check in Use Case", () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(inMemoryCheckInsRepository);

    // vi.useFakeTimers();
  });

  afterEach(() => {
    // vi.useRealTimers();
  });
  it("should be able to validate the check in", async () => {
    const createdCheckIn = await inMemoryCheckInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    });

    await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(createdCheckIn.validated_at).toEqual(expect.any(Date));
    expect(inMemoryCheckInsRepository.items[0].validated_at).toEqual(
      expect.any(Date)
    );
  });
  it("should not be able to validate an inexistent check in", async () => {
    await expect(() =>
      sut.execute({
        checkInId: "inexistent-check-in",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
