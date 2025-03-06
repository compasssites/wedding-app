import { type AuthenticatedOperationFor } from '../wrappers.js';
import { getUserData as getUserData_ext } from 'wasp/src/queries';
export type GetUserData_ext = typeof getUserData_ext;
export declare const getUserData: AuthenticatedOperationFor<GetUserData_ext>;
