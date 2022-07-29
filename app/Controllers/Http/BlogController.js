'use strict'
const Blog = use('App/Models/Blog')
const AuthorizationService = use('App/Services/AuthorizationService')


class BlogController {
    async index({ auth, response }) {
        const user = await auth.getUser();
        const blogs = await Blog.query()
            .where('user_id', user.id)
            .orderBy('created_at', 'desc')
            .fetch();
        return response.status(200).json(blogs);
    }

    async store({ request, response, auth }) {
        const user = await auth.getUser();
        const { title, body } = request.all();
        const blog = new Blog();
        blog.title = title;
        blog.body = body;
        await user.blogs().save(blog);
        return response.status(201).json(blog);
    }

    async show({ params, response, auth }) {
        const user = await auth.getUser();
        const blog = await Blog.find(params.id);
        AuthorizationService.verifyPermission(blog, user)
        return response.status(200).json(blog);
    }

    async update({ params, request, response, auth }) {
        const user = await auth.getUser();
        const { body, title } = request.all();
        const blog = await Blog.findOrFail(params.id);
        AuthorizationService.verifyPermission(blog, user)
        blog.title = title;
        blog.body = body;
        await blog.save();
        return response.status(200).json(blog);
    }

    async destroy({ params, auth, response }) {
        const user = await auth.getUser();
        const blog = await Blog.find(params.id);
        if (blog === null)
            return response.status(404).json({ message: 'Resource not found' });
        AuthorizationService.verifyPermission(blog, user);
        await blog.delete()
        return response.status(200).json({ message: 'Blog deleted', blog });
    }
}

module.exports = BlogController
