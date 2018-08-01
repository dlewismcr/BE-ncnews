const { Topic, Article } = require("../models");

const getAllTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

const getArticlesByTopicSlug = (req, res, next) => {
  console.log("getArticlesByTopicSlug", req.params);
  const { topic_slug } = req.params;
  Article.find({ belongs_to: topic_slug })
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

const addArticleByTopicSlug = (req, res, next) => {
  console.log("addArticleByTopicSlug", req.params);
  const { topic_slug } = req.params;
  Article.create({
    title: req.body.title,
    body: req.body.body,
    belongs_to: topic_slug,
    created_by: req.body.created_by
  })
    .then(article => {
      res.status(201).send({ article });
    })
    .catch(next);
};

module.exports = {
  getAllTopics,
  getArticlesByTopicSlug,
  addArticleByTopicSlug
};
