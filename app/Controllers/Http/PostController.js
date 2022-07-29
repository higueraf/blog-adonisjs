'use strict'
const Post = use('App/Models/Post')
const AuthorizationService = use('App/Services/AuthorizationService')


class PostController {
    async index({ auth, response }) {
        const user = await auth.getUser();
        const posts = await Post.query()
            .where('user_id', user.id)
            .orderBy('created_at', 'desc')
            .fetch();
        return response.status(200).json(posts);
    }

    async store({ request, response, auth }) {
        const user = await auth.getUser();
        const { title, body } = request.all();
        const post = new Post();
        post.title = title;
        post.body = body;
        await user.posts().save(post);
        return response.status(201).json(post);
    }

    async show({ params, response, auth }) {
        const user = await auth.getUser();
        const post = await Post.find(params.id);
        AuthorizationService.verifyPermission(post, user)
        return response.status(200).json(post);
    }

    async update({ params, request, response, auth }) {
        const user = await auth.getUser();
        const { body, title } = request.all();
        const post = await Post.findOrFail(params.id);
        AuthorizationService.verifyPermission(post, user)
        post.title = title;
        post.body = body;
        await post.save();
        return response.status(200).json(post);
    }

    async destroy({ params, auth, response }) {
        const user = await auth.getUser();
        const post = await Post.find(params.id);
        if (post === null)
            return response.status(404).json({ message: 'Resource not found' });
        AuthorizationService.verifyPermission(post, user);
        await post.delete()
        return response.status(200).json({ message: 'Post deleted', post });
    }
}

module.exports = PostController
