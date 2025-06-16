export type Role = "ADMIN" | "USER";

export const Role = {
  ADMIN: "ADMIN" as Role,
  USER: "USER" as Role,
} as const;
