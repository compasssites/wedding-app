import { type Entity, type EntityName, type User } from 'wasp/entities';
export type _User = WithName<User, "User">;
export type _Entity = _User | never;
type WithName<E extends Entity, Name extends EntityName> = E & {
    _entityName: Name;
};
export {};
