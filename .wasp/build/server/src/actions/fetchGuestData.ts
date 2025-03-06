import { prisma } from 'wasp/server'

import { fetchGuestData } from '../../../../../src/actions.js'


export default async function (args, context) {
  return (fetchGuestData as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
    },
  })
}
