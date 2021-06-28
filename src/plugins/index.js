const app = require("./fastify")
const system = require("./admin/system")
const axios = require("./axios")
const WS = require("./webSocket")
const knex = require("./knexDB")
const validator = require("./validator")
const mailer = require("./nodeMailer")
const reCaptcha = require("./reCaptcha")
const crypt = require("./crypt")

// Some other frequently used plugins and modules
const path = require("path")
const fsx = require("fs-extra")
const multer = require("fastify-multer")
const bcrypt = require("bcrypt")
const sanitizeHTML = require("sanitize-html")

//some utils functions
const hlp = require("./helpers")
const imgBaseUrl = (process.env.NODE_ENV === "development" ? "http://127.0.0.1:3000" : "") + "/img/"

module.exports = {
    app,
    system,
    axios,
    WS,
    knex,
    validator,
    mailer,
    reCaptcha,
    crypt,
    path,
    fsx,
    multer,
    bcrypt,
    sanitizeHTML,

    //
    hlp,
    imgBaseUrl,
}
