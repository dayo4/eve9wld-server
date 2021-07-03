const Products = require("./Services")

module.exports = async (app, options) => {
	app.get(
		"/products/all/:query",
		{
			preValidation: [
				(req, reply, done) => {
					req.verify = {
						roles: [9, 10]
					}
					done()
				},
				app.AuthHooks.verifyUser
			]
		},
		Products.findAll
	)

	app.get(
		"/products/:slug",
		{
			preValidation: [
				(req, reply, done) => {
					req.verify = {
						roles: [9, 10]
					}
					done()
				},
				app.AuthHooks.verifyUser
			]
		},
		Products.findOne
	)

	app.post(
		"/products/new/:user_id",
		{
			preValidation: [
				(req, reply, done) => {
					req.verify = {
						roles: [9, 10]
					}
					done()
				},
				app.AuthHooks.verifyUser
			]
			// preHandler: Validation.create,
		},
		Products.create
	)

	app.patch(
		"/products/update",
		{
			preValidation: [
				(req, reply, done) => {
					req.verify = {
						roles: [9, 10]
					}
					done()
				},
				app.AuthHooks.verifyUser
			]
			// preHandler: Validation.update
		},
		Products.update
	)

	app.delete(
		"/products/delete",
		{
			preValidation: [
				(req, reply, done) => {
					req.verify = {
						roles: [10]
					}
					done()
				},
				app.AuthHooks.verifyUser
			]
		},
		Products.delete
	)
}
