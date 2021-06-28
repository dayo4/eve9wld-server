const { multer, fsx } = require("../../../../plugins")

/* import services */
const ImageService = require("./Services")

const date = new Date()
const prefix = date.getFullYear().toString().substr(-2) + "_" + (date.getMonth() + 1) + "/"

/* initialize multer's storage functions */
const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        const url = "src/uploads/images/" + prefix
        fsx.ensureDirSync(url)
        cb(null, url)
    },
    filename: function (request, file, cb) {
        // let query = JSON.parse(request.params.query)
        // console.log(file)
        // function setFileName() {
        //     if (!query.preserveName) {
        //         return (
        //             "img" +
        //             //   Math.floor(Math.random() * 1000 + 1) +
        //             "_" +
        //             date.getTime() +
        //             "." +
        //             file.mimetype.split("/")[1]
        //         )
        //     } else {
        //         return file.originalname.split(".")[0]
        //     }
        // }
        const filename = file.originalname
        request.file.filename = prefix + file.originalname
        cb(null, filename)
    },
})
const upload = multer({
    storage: storage,
    fileFilter: (request, file, cb) => {
        request.file = file
        if (!["image/jpeg", "image/jpg", "image/png"].includes(file.mimetype)) {
            const error = new Error("Incorrect_FileType")
            return cb(error, false)
        }
        cb(null, true)
    },
    limits: {
        fileSize: 1000000,
    },
})

/* create api endpoints for the image uploads */
module.exports = async (app, options) => {
    /* HANDLERS */
    app.post(
        "/lib/uploadImage/:user_id",
        {
            preValidation: [
                (req, reply, done) => {
                    req.verify = [9, 10]
                    done()
                },
                app.AuthHooks.verifyUser,
            ],
            preHandler: upload.fields([
                { name: "image", maxCount: 1 },
                // { name: 'contentImages', maxCount: 10 }
            ]),
        },
        ImageService.upload
    )
    app.get(
        "/lib/fetchImages/:query",
        {
            preValidation: [
                (req, reply, done) => {
                    req.verify = [9, 10]
                    done()
                },
                app.AuthHooks.verifyUser,
            ],
        },
        ImageService.findAll
    )

    app.patch(
        "/lib/updateImage/:image_id",
        {
            preValidation: app.AuthHooks.verifyUser,
            //   preHandler: upload.fields([
            //     { name: "image", maxCount: 1 },
            //     // { name: 'contentImages', maxCount: 10 }
            //   ]),
        },
        ImageService.update
    )

    app.delete(
        "/lib/deleteImages/:user_id",
        {
            preValidation: app.AuthHooks.verifyUser,
        },
        ImageService.delete
    )
}
