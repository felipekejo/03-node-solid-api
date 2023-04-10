import { it, describe, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/In-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(inMemoryUsersRepository);
  });
  it("should be able to authenticate", async () => {
    await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "johndoes@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "johndoes@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("should be able to authenticate with wrong email", async () => {
    expect(
      async () =>
        await sut.execute({
          email: "johndoes@example.com",
          password: "123456",
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should be able to authenticate with wrong email", async () => {
    await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "johndoes@example.com",
      password_hash: await hash("123456", 6),
    });

    expect(
      async () =>
        await sut.execute({
          email: "johndoes@example.com",
          password: "123123",
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
