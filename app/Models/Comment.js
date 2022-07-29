'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comment extends Model {
    blog() {
        return this.belongsTo('App/Models/Blog')
    }
}

module.exports = Comment
