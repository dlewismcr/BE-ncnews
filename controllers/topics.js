const { Topic, Article } = require("../models");
const getCommentCount = require("./articles");

const getAllTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

const getArticlesByTopicSlug = (req, res, next) => {
  const { topic_slug } = req.params;
  Article.find({ belongs_to: topic_slug })
    .populate("created_by")
    .lean()
    .then(articles => {
      return Promise.all(
        articles.map(article => {
          return Promise.all([article, getCommentCount(article._id)]);
        })
      );
    })
    .then(articles => {
      if (articles.length === 0) {
        next({ status: 400, msg: "400: Topic not found" });
      } else {
        const commentArticles = articles.map(article => {
          article[0].commentCount = article[1];
          return article[0];
        });
        res.status(200).send({ articles: commentArticles });
      }
    })
    .catch(next);
};

const addArticleByTopicSlug = (req, res, next) => {
  const { topic_slug } = req.params;
  Article.create({
    title: req.body.title,
    body: req.body.body,
    belongs_to: topic_slug,
    created_by: req.body.created_by
  })
    .then(article => {
      return Article.findOne({ _id: article._id }).populate("created_by");
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
