import { type ActionFor, createAction } from './core'
import { FetchGuestData_ext } from 'wasp/server/operations/actions'

// PUBLIC API
export const fetchGuestData: ActionFor<FetchGuestData_ext> = createAction<FetchGuestData_ext>(
  'operations/fetch-guest-data',
  ['User'],
)
