'use strict'
const Post = use('App/Models/Post')
const Comment = use('App/Models/Comment')
const User = use('App/Models/User')
const AuthorizationService = use('App/Services/AuthorizationService')


class CommentController {
    async index({ auth, response, params }) {
        const user = await auth.getUser();
        const post = await Post.find(params.post_id);
        if (post === null)
            return response.status(404).json({ message: 'Resource not found' });
        AuthorizationService.verifyPermission(post, user)
        const comments = await Comment.query()
            .where('post_id', params.post_id)
            .orderBy('created_at', 'desc')
            .fetch();
        return response.status(200).json(comments);
    }

    async store({ request, response, auth }) {
        const user = await auth.getUser();
        const { comment, post_id } = request.all();
        const post = await Post.find(post_id);
        AuthorizationService.verifyPermission(post, user)
        const newComment = new Comment();
        newComment.comment = comment;
        await post.comments().save(newComment);
        return response.status(201).json(newComment);
    }

    async show({ params, response, auth }) {
        const user = await auth.getUser();
        const post = await Post.find(params.id);
        AuthorizationService.verifyPermission(post, user)
        const comment = await Comment.find(params.id);
        return response.status(200).json(comment);
    }

    async update({ params, request, response, auth }) {
        const user = await auth.getUser();
        const { comment } = request.all();
        const commentUpdated = await Comment.findOrFail(params.id);
        if (commentUpdated === null)
            return response.status(404).json({ message: 'Resource not found' });
        const post = await Post.findOrFail(commentUpdated.post_id);
        AuthorizationService.verifyPermission(post, user)
        commentUpdated.comment = comment;
        await commentUpdated.save();
        return response.status(200).json(commentUpdated);
    }

    async destroy({ params, auth, response }) {
        const user = await auth.getUser();
        const comment = await Comment.find(params.id);
        if (comment === null)
            return response.status(404).json({ message: 'Resource not found' });
        const post = await Post.findOrFail(comment.post_id);
        AuthorizationService.verifyPermission(post, user)
        await comment.delete()
        return response.status(200).json({ message: 'Comment deleted', comment });
    }
}

module.exports = CommentController
