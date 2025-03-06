
import { prisma } from 'wasp/server'
import {
  type UnauthenticatedOperationFor,
  createUnauthenticatedOperation,
  type AuthenticatedOperationFor,
  createAuthenticatedOperation,
} from '../wrappers.js'
import { fetchGuestData as fetchGuestData_ext } from 'wasp/src/actions'

// PRIVATE API
export type FetchGuestData_ext = typeof fetchGuestData_ext

// PUBLIC API
export const fetchGuestData: AuthenticatedOperationFor<FetchGuestData_ext> =
  createAuthenticatedOperation(
    fetchGuestData_ext,
    {
      User: prisma.user,
    },
  )
