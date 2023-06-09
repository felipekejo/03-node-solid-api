import { it, describe, expect, beforeEach, vi, afterEach } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/In-memory/in-memory-checkins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/In-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxCheckInError } from "./errors/max-number-of-check-in-error";
import { MaxDistanceError } from "./errors/max-distance-error";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check in Use Case", () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(
      inMemoryCheckInsRepository,
      inMemoryGymsRepository
    );

    await inMemoryGymsRepository.create({
      id: "gym-01",
      description: "",
      title: "JS Gym",
      phone: "",
      latitude: -34.9686588,
      longitude: 138.5687609,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -34.9686588,
      userLongitude: 138.5687609,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
  it("should not be able to check in twice in a same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -34.9686588,
      userLongitude: 138.5687609,
    });

    expect(
      async () =>
        await sut.execute({
          userId: "user-01",
          gymId: "gym-01",
          userLatitude: -34.9686588,
          userLongitude: 138.5687609,
        })
    ).rejects.toBeInstanceOf(MaxCheckInError);
  });
  it("should  be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -34.9686588,
      userLongitude: 138.5687609,
    });
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));
    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -34.9686588,
      userLongitude: 138.5687609,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    inMemoryGymsRepository.items.push({
      id: "gym-02",
      description: "",
      title: "JS Gym",
      phone: "",
      latitude: new Decimal(-34.8359879),
      longitude: new Decimal(138.6939328),
    });

    await expect(() =>
      sut.execute({
        userId: "user-01",
        gymId: "gym-02",
        userLatitude: -34.9686588,
        userLongitude: 138.5687609,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
