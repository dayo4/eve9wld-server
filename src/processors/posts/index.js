const Post = require("./Services")
// const Validation = require("./Schemas");
module.exports = async (app, options) => {
	app.get("/posts/all/:query", {}, Post.findAll)
	app.get("/posts/:slug", {}, Post.findOne)
	app.get("/posts/users/:user_id/:query", {}, Post.findUserPosts)
}
