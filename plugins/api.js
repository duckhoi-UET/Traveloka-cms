import Auth from '@/api/auth';
import Users from '@/api/users';

export default (context, inject) => {
    // Initialize API factories
    const factories = {
        auth: Auth(context.$axios),
        users: Users(context.$axios),
    };

    // Inject $api
    inject('api', factories);
};
