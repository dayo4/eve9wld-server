module.exports = async (app, options) => {
    app.register(require("./auth"))
    app.register(require("./users"))
    app.register(require("./products"))
    app.register(require("./posts"))
    app.register(require("./media/mediaLibrary"))
    app.register(require("./system"))
}
