import { api, handleApiError } from 'wasp/client/api';
export default async function signup(userFields) {
    try {
        await api.post('/auth/username/signup', userFields);
    }
    catch (error) {
        throw handleApiError(error);
    }
}
//# sourceMappingURL=signup.js.map