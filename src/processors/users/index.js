module.exports = async (app, options) => {
	app.register(require("./account"))
	app.register(require("./base_profile"))
}
