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
  Route.get('blogs', 'BlogController.index'),
  Route.get('blogs/:id', 'BlogController.show'),
  Route.post('blogs', 'BlogController.store'),
  Route.put('blogs/:id', 'BlogController.update'),
  Route.delete('blogs/:id', 'BlogController.destroy')
}).prefix('api/v1').middleware('auth');

Route.group(() => {
  Route.post('users/login', 'UserController.login'),
  Route.get('users/register', 'UserController.register')
}).prefix('api/v1')
