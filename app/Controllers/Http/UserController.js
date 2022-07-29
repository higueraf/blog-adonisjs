'use strict'
const User = use('App/Models/User')

class UserController {

    async index({ response }) {
        const users = await User.query()
            .orderBy('created_at', 'desc')
            .fetch();
        return response.status(200).json(users);
    }
    async store({ request, response }) {
        const { email, password } = request.all();
        const user = await User.create({ email, password, username: email });
        delete user.password;
        return response.status(200).json(user);
    }
    async show({ params, response }) {
        const user = await User.find(params.id);
        if (!user) {
            return response.status(404).json({ message: 'Resource not found' });
        }
        return response.status(200).json(user);
    }
    async update({ params, request, response }) {
        const { email, password } = request.all();
        const user = await User.findOrFail(params.id);
        user.email = email;
        user.password = password;
        await user.save();
        return response.status(200).json(user);
    }
    async destroy({ params, response }) {
        const user = await User.find(params.id);
        await user.delete()
        return response.status(200).json({ message: 'User deleted', user });
    }
    async register({ request }) {
        const { email, password } = request.all();
        const user = await User.create({ email, password, username: email });
        return await this.login(...arguments);
    }
    async login({ request, auth }) {
        const { email, password } = request.all();
        const token = await auth.attempt(email, password);
        return token;
    }
}


module.exports = UserController
