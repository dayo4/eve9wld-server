const { multer, fsx } = require("../../../plugins")

/* import services */
const UserImage = require("./Services")

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
    // app.get('/users/fetchImages/:user_id', UserImage.fetchImages)

    app.patch(
        "/users/uploadImages/:user_id",
        {
            preValidation: app.AuthHooks.verifyUser,
            preHandler: upload.fields([
                { name: "profileImage", maxCount: 1 },
                { name: "coverImage", maxCount: 1 },
            ]),
            // preHandler: upload.single('profileImage')
        },
        UserImage.upload
    )

    // app.delete('/users/deleteImages/:user_id', {
    //     preValidation: app.AuthHooks.verifyUser,
    // }, UserImage.delete)
}
