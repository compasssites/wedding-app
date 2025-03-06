import { prisma } from 'wasp/server';
import { createAuthenticatedOperation, } from '../wrappers.js';
import { getUserData as getUserData_ext } from 'wasp/src/queries';
// PUBLIC API
export const getUserData = createAuthenticatedOperation(getUserData_ext, {
    User: prisma.user,
});
//# sourceMappingURL=index.js.map