const User = require("./Services")
// const Schema = require("./Schemas")

module.exports = async (app, options) => {
	app.get("/users/:username", {}, User.findOne)
}
