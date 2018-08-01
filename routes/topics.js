const topicsRouter = require("express").Router();
const {
  getAllTopics,
  getArticlesByTopicSlug,
  addArticleByTopicSlug
} = require("../controllers/topics");

topicsRouter.route("/").get(getAllTopics);
topicsRouter
  .route("/:topic_slug/articles")
  .get(getArticlesByTopicSlug)
  .post(addArticleByTopicSlug);

module.exports = topicsRouter;
