const articlesRouter = require("express").Router();

const {
  getAllArticles,
  getArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
  putArticleById
} = require("../controllers/articles");

articlesRouter.route("/").get(getAllArticles);
articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .put(putArticleById);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId);

module.exports = articlesRouter;
