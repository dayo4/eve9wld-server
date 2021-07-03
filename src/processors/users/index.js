const User = require("./Services")
const Schema = require("./Schemas")

module.exports = async (app, options) => {
	app.get("/users/:username", {}, User.findOne)

	app.patch(
		"/users/:id",
		{
			preValidation: [
				(req, reply, done) => {
					req.verify = {
						id: [req.params.id]
					}
					done()
				},
				app.AuthHooks.verifyUser
			],
			preHandler: Schema.update
		},
		User.update
	)

	app.delete(
		"/users/:id",
		{
			preValidation: [
				(req, reply, done) => {
					req.verify = {
						id: [req.params.id]
					}
					done()
				},
				app.AuthHooks.verifyUser
			],
			schema: ""
		},
		User.delete
	)
}
