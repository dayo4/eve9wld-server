const Posts = require("./Services")

module.exports = async (app, options) => {
    app.get(
        "/posts/all/:query",
        {
            preValidation: [
                (req, reply, done) => {
                    req.verify = [9, 10]
                    done()
                },
                app.AuthHooks.verifyUser,
            ],
        },
        Posts.findAll
    )

    app.get(
        "/posts/:slug",
        {
            preValidation: [
                (req, reply, done) => {
                    req.verify = [9, 10]
                    done()
                },
                app.AuthHooks.verifyUser,
            ],
        },
        Posts.findOne
    )

    app.post(
        "/posts/new/:user_id",
        {
            preValidation: [
                (req, reply, done) => {
                    req.verify = [9, 10]
                    done()
                },
                app.AuthHooks.verifyUser,
            ],
            // preHandler: Validation.create,
        },
        Posts.create
    )

    app.patch(
        "/posts/update",
        {
            preValidation: [
                (req, reply, done) => {
                    req.verify = [9, 10]
                    done()
                },
                app.AuthHooks.verifyUser,
            ],
            // preHandler: Validation.update
        },
        Posts.update
    )

    app.delete(
        "/posts/delete",
        {
            preValidation: [
                (req, reply, done) => {
                    req.verify = [10]
                    done()
                },
                app.AuthHooks.verifyUser,
            ],
        },
        Posts.delete
    )
}
