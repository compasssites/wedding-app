import { type User } from "@prisma/client";
export { type User, type Auth, type AuthIdentity, } from "@prisma/client";
export type Entity = User | never;
export type EntityName = "User" | never;
