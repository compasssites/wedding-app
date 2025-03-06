
import { prisma } from 'wasp/server'
import {
  type UnauthenticatedOperationFor,
  createUnauthenticatedOperation,
  type AuthenticatedOperationFor,
  createAuthenticatedOperation,
} from '../wrappers.js'
import { getUserData as getUserData_ext } from 'wasp/src/queries'

// PRIVATE API
export type GetUserData_ext = typeof getUserData_ext

// PUBLIC API
export const getUserData: AuthenticatedOperationFor<GetUserData_ext> =
  createAuthenticatedOperation(
    getUserData_ext,
    {
      User: prisma.user,
    },
  )

