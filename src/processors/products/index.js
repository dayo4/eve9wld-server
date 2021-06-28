const Products = require("./Services");
// const Validation = require("./Schemas");
module.exports = async (app, options) => {
  app.post("/products", {}, Products.findAll);

  app.get("/products/:slug", {}, Products.findOne);
};
