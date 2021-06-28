const { knex, hlp, path, fsx, imgBaseUrl } = require("../../../../plugins")

module.exports = {
    async findAll(request, reply) {
        const query = JSON.parse(request.params.query)
        const limit = query.limit
        const offset = query.offset
        const filter = query.filter
        const sort = query.sort

        try {
            const images = await knex("images")
                .select()
                .where(filter)
                .orderBy(...sort)
                .limit(limit)
                .offset(offset)
            const imagesCount = await knex("images").where(filter).count()

            return { images, count: imagesCount[0]["count(*)"] }
        } catch (e) {
            hlp.error(e)
        }
    },

    async upload(request, reply) {
        const user_id = request.params.user_id
        // const post_id = request.params.post_id
        const possibleEntries = ["caption", "alt", "description", "type"]

        if (request.file) {
            const imageUrl = imgBaseUrl + request.file.filename

            const data = {
                url: imageUrl,
                user_id,
                name: request.file.filename,
            }

            Object.keys(request.body).forEach((key) => {
                if (possibleEntries.includes(key)) data[key] = request.body[key]
            })

            try {
                const imageUrl = await knex("images").insert(data)

                return {
                    imageUrl: imageUrl,
                }
            } catch (err) {
                /* if there's an error at the database level, delete the image just uploaded to the directory.*/
                const url = "src/uploads/images/" + request.file.filename

                fsx.remove(url).catch((e) => {
                    hlp.error(e)
                })
                hlp.error(err)
            }
        } else return "no file added"
    },

    async update(request, reply) {
        const image_id = request.params.image_id

        const possibleEntries = ["name", "caption", "url", "alt", "description", "type"]
        const imageUrl = imageUrl + request.file.filename

        const data = {
            // url: imageUrl,
            user_id,
        }

        Object.keys(request.body).forEach((key) => {
            if (possibleEntries.includes(key)) data[key] = request.body[key]
        })

        try {
            await knex("images").where("id", image_id).update(data)

            return "Updated Successfully"
        } catch (err) {
            hlp.error(err)
        }
    },

    async delete(request, reply) {
        // const user_id = request.params.id
        const images = request.body.imagesUrls //An array of image urls

        try {
            for (const url of images) {
                const image = await knex("images").where("url", url).del("name")
                const imagePath = "src/uploads/images/" + image

                fsx.remove(imagePath)
                    .then(() => {})
                    .catch((e) => {
                        hlp.error(e)
                    })
            }
        } catch (err) {
            hlp.error(err)
        }
    },
}
