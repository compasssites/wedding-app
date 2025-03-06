import { type QueryFor, createQuery } from './core'
import { GetUserData_ext } from 'wasp/server/operations/queries'

// PUBLIC API
export const getUserData: QueryFor<GetUserData_ext> = createQuery<GetUserData_ext>(
  'operations/get-user-data',
  ['User'],
)

// PRIVATE API (used in SDK)
export { buildAndRegisterQuery } from './core'
