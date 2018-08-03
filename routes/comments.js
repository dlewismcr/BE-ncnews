const commentsRouter = require("express").Router();
const {
  putCommentById,
  deleteCommentById,
  getAllComments
} = require("../controllers/comments");

commentsRouter.route("/").get(getAllComments);
commentsRouter
  .route("/:comment_id")
  .put(putCommentById)
  .delete(deleteCommentById);

module.exports = commentsRouter;
