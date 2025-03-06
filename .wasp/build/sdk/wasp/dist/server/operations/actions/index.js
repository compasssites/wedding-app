import { prisma } from 'wasp/server';
import { createAuthenticatedOperation, } from '../wrappers.js';
import { fetchGuestData as fetchGuestData_ext } from 'wasp/src/actions';
// PUBLIC API
export const fetchGuestData = createAuthenticatedOperation(fetchGuestData_ext, {
    User: prisma.user,
});
//# sourceMappingURL=index.js.map