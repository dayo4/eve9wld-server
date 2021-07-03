const Auth = require("./Services")
const Schemas = require("./Schemas")

module.exports = async (app, options) => {
	app.post(
		"/register",
		{
			preHandler: Schemas.Register
		},
		Auth.register
	)

	app.post(
		"/login",
		{
			preHandler: Schemas.Login
		},
		Auth.login
	)

	app.get("/system/settings", {}, Auth.getSettings)

	app.post("/verifyEmail", {}, Auth.verifyEmail)
	app.post("/resetPassword", {}, Auth.resetPassword)
}
