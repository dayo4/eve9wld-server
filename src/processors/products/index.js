const Products = require("./Services")
// const Validation = require("./Schemas");
module.exports = async (app, options) => {
	app.get("/products/all/:query", {}, Products.findAll)

	app.get("/products/:slug", {}, Products.findOne)
}
