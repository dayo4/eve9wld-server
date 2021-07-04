const Account = require("./Services")
const Schema = require("./Schemas")

module.exports = async (app, options) => {
	app.get(
		"/account/info/:user_id",
		{
			preValidation: [
				(req, reply, done) => {
					req.verify = {
						id: [req.params.user_id]
					}
					done()
				},
				app.AuthHooks.verifyUser
			]
		},
		Account.find
	)
	app.patch(
		"/account/info/:user_id",
		{
			preValidation: [
				(req, reply, done) => {
					req.verify = {
						id: [req.params.user_id]
					}
					done()
				},
				app.AuthHooks.verifyUser
			]
			// preHandler: Schema.update
		},
		Account.update
	)
	// app.patch(
	// 	"/users/:id",
	// 	{
	// 		preValidation: [
	// 			(req, reply, done) => {
	// 				req.verify = {
	// 					id: [req.params.id]
	// 				}
	// 				done()
	// 			},
	// 			app.AuthHooks.verifyUser
	// 		],
	// 		preHandler: Schema.update
	// 	},
	// 	User.update
	// )

	// app.delete(
	// 	"/users/:id",
	// 	{
	// 		preValidation: [
	// 			(req, reply, done) => {
	// 				req.verify = {
	// 					id: [req.params.id]
	// 				}
	// 				done()
	// 			},
	// 			app.AuthHooks.verifyUser
	// 		],
	// 		schema: ""
	// 	},
	// 	User.delete
	// )
}
