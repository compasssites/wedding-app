import { createQuery } from './core';
// PUBLIC API
export const getUserData = createQuery('operations/get-user-data', ['User']);
// PRIVATE API (used in SDK)
export { buildAndRegisterQuery } from './core';
//# sourceMappingURL=index.js.map