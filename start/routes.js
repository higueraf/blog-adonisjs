'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.group(() => {
  Route.get('users', 'UserController.index'),
    Route.post('users', 'UserController.store'),
    Route.get('users/:id', 'UserController.show'),
    Route.put('users/:id', 'UserController.update'),
    Route.delete('users/:id', 'UserController.destroy'),
    Route.get('posts', 'PostController.index'),
    Route.get('posts/:id', 'PostController.show'),
    Route.post('posts', 'PostController.store'),
    Route.put('posts/:id', 'PostController.update'),
    Route.delete('posts/:id', 'PostController.destroy'),
    Route.get('comments/post/:post_id', 'CommentController.index'),
    Route.get('comments/:id', 'CommentController.show'),
    Route.post('comments', 'CommentController.store'),
    Route.put('comments/:id', 'CommentController.update'),
    Route.delete('comments/:id', 'CommentController.destroy')

}).prefix('api/v1').middleware('auth');

Route.group(() => {
  Route.post('users/login', 'UserController.login'),
    Route.post('users/register', 'UserController.register')
}).prefix('api/v1')
