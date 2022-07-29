const ForbiddenAccessException = use('App/Exceptions/ForbiddenAccessException')
class AuthorizationService {
    verifyPermission(resource, user) {
        if (resource.user_id !== user.id)
            throw new ForbiddenAccessException();
    }
}

module.exports = new AuthorizationService();