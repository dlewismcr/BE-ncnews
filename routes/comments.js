const commentsRouter = require("express").Router();
const {
  putCommentById,
  deleteCommentById
} = require("../controllers/comments");

commentsRouter
  .route("/:comment_id")
  .put(putCommentById)
  .delete(deleteCommentById);

module.exports = commentsRouter;
