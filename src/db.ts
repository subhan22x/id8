import { PrismaClient, Prisma, MetalColor, Emblem, StyleName, Prompt, User } from "@prisma/client";

// Ensure a single PrismaClient instance during development to avoid creating multiple SQLite connections.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

type JsonLike = unknown;

export async function createUser({ storeName }: { storeName: string }): Promise<User> {
  const trimmed = storeName.trim();
  if (!trimmed) {
    throw new Error("storeName must be a non-empty string");
  }
  return prisma.user.create({ data: { storeName: trimmed } });
}

export function getUser(id: number): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

type CreatePromptInput = {
  userId: number;
  styleName: StyleName;
  twoTone: boolean;
  primaryColor: MetalColor;
  secondaryColor?: MetalColor | null;
  emblem: Emblem;
  jsonOverrides?: JsonLike;
};

function validateTwoTone({ twoTone, secondaryColor }: { twoTone: boolean; secondaryColor?: MetalColor | null }) {
  if (twoTone && !secondaryColor) {
    throw new Error("secondaryColor is required when twoTone is true");
  }
  if (!twoTone && secondaryColor) {
    throw new Error("secondaryColor must be omitted when twoTone is false");
  }
}

function serializeOverrides(overrides?: JsonLike): Prisma.InputJsonValue {
  if (overrides === undefined) {
    return {};
  }
  if (typeof overrides === "string") {
    try {
      return JSON.parse(overrides) as Prisma.InputJsonValue;
    } catch (error) {
      throw new Error("jsonOverrides string must be valid JSON");
    }
  }
  try {
    return JSON.parse(JSON.stringify(overrides)) as Prisma.InputJsonValue;
  } catch (error) {
    throw new Error("jsonOverrides must be serializable to JSON");
  }
}

export async function createPrompt(input: CreatePromptInput): Promise<Prompt> {
  validateTwoTone(input);
  const { userId, styleName, twoTone, primaryColor, secondaryColor, emblem } = input;
  const jsonOverrides = serializeOverrides(input.jsonOverrides);

  await ensureUserExists(userId);

  return prisma.prompt.create({
    data: {
      userId,
      styleName,
      twoTone,
      primaryColor,
      secondaryColor: twoTone ? (secondaryColor as MetalColor | undefined) ?? null : null,
      emblem,
      jsonOverrides
    }
  });
}

async function ensureUserExists(userId: number) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
  if (!user) {
    throw new Error(`User ${userId} does not exist`);
  }
}

export function getUserPrompts(userId: number): Promise<Prompt[]> {
  return prisma.prompt.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });
}

type ListPromptsOptions = { limit?: number; offset?: number };

export function listPrompts({ limit = 50, offset = 0 }: ListPromptsOptions = {}): Promise<Prompt[]> {
  const take = Math.min(Math.max(limit, 1), 100);
  const skip = Math.max(offset, 0);

  return prisma.prompt.findMany({
    take,
    skip,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }]
  });
}

export type { MetalColor, Emblem, StyleName } from "@prisma/client";
