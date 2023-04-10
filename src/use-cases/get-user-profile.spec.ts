import { it, describe, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/In-memory/in-memory-users-repository";
import { hash } from "bcryptjs";

import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(inMemoryUsersRepository);
  });
  it("should be able to get user profile", async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "johndoes@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("John Doe");
  });
  it("should not be able to get user profile with wrong id", async () => {
    expect(
      async () =>
        await sut.execute({
          userId: "non-exist-id",
        })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
