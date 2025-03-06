import { prisma } from 'wasp/server'

import { getUserData } from '../../../../../src/queries.js'


export default async function (args, context) {
  return (getUserData as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
    },
  })
}
