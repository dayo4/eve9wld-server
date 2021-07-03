const Admin = require("./Services")

module.exports = async (app, options) => {
	app.post(
		"/allUsers",
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
		Admin.findAll
	)

	app.get(
		"/users/:user_id",
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
		Admin.findOne
	)

	app.patch(
		"/users/status/",
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
		Admin.changeStatus
	)
	app.delete(
		"/users/delete/:user_id",
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
		Admin.delete
	)
}
