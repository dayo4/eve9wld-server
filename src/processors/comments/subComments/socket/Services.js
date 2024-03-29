const { knex, WS, hlp } = require('../../../../plugins')

module.exports = {

    async findComments (socket, params) {

        const comment_id = params.comment_id
        const query = params.query
        const limit = query.limit
        const offset = query.offset
        const sort = query.sort /* Array of 2 strings e.g ['created_at', 'desc'] */

        async function fetchCommentUser (comment) {
            const user = await knex.select('profile_image', 'username', 'first_name', 'last_name').from('users').where('id', comment.user_id).first()
            if (user)
            {
                return {
                    ...comment,
                    user,
                }
            }
        }

        try
        {
            const fetchedComments = await knex.select('id', 'user_id', 'post_id', 'thumbs_up', 'thumbs_down', 'content', 'created_at').from('posts_subcomments').where('comment_id', comment_id).orderBy(...sort).limit(limit).offset(offset)
            const commentCount = await knex('posts_subcomments').where('comment_id', comment_id).count()

            const comments = await Promise.all(fetchedComments.map(async (comment) => {
                return await fetchCommentUser(comment)
            }))
            socket.send(JSON.stringify({ comments, count: commentCount[ 0 ][ "count(*)" ] }))
        }
        catch (e)
        {
            socket.write(e)
            hlp.error(e)
        }
    },

}
