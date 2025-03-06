import { type AuthenticatedOperationFor } from '../wrappers.js';
import { fetchGuestData as fetchGuestData_ext } from 'wasp/src/actions';
export type FetchGuestData_ext = typeof fetchGuestData_ext;
export declare const fetchGuestData: AuthenticatedOperationFor<FetchGuestData_ext>;
