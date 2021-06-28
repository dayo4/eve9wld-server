const { knex, path, fsx } = require("../../../plugins");

module.exports = {
  async upload(request, reply) {
    const user_id = request.params.user_id;
    if (request.file) {
      const imageUrl =
        (process.env.NODE_ENV === "development"
          ? "http://127.0.0.1:3000"
          : "") +
        "/" +
        request.file.filename;

      const imageClass = request.file.fieldname;

      function whichImage() {
        if (imageClass === "profileImage") {
          return {
            profile_image: imageUrl,
          };
        } else if (imageClass === "coverImage") {
          return {
            cover_image: imageUrl,
          };
        }
      }

      const imageToStore = whichImage();

      try {
        /* Remove Existing Image */
        const key = Object.keys(imageToStore)[0];
        const prevImage = await knex("images")
          .where({ url: imageUrl, type: "user", user_id })
          .select("name")
          .first();

        if (prevImage) {
          const url = "src/uploads/images/" + prevImage.name;
          fsx.remove(url).catch((e) => {
            reply.status(500).send(e);
          });

          await knex("images")
            .where({ url: imageUrl, type: "user", user_id })
            .del();
        }

        /* Upload new image */
        const updated = await knex("users")
          .where("id", user_id)
          .update(imageToStore);

        if (updated);
        {
          reply.send({
            user: {
              ...imageToStore,
            },
          });
        }
      } catch (err) {
        /* if there's an error at the database level, delete the image just uploaded to the directory.*/
        const url = "src/uploads/images/" + request.file.filename;

        fsx.remove(url).catch((e) => {
          reply.status(500).send(e);
        });
        reply.status(500).send(err);
      }
    }

    return reply;
  },
};
