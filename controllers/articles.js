const { Article, Comment } = require("../models");

const getAllArticles = (req, res, next) => {
  Article.find()
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  Article.find({ _id: article_id })
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

const getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  Comment.find({ belongs_to: article_id })
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

const postCommentByArticleId = (req, res, next) => {
  console.log("postCommentByArticle" + req.params);
  const { article_id } = req.params;
  Comment.create({
    body: req.body.body,
    belongs_to: article_id,
    created_by: req.body.created_by
  });
};

module.exports = {
  getAllArticles,
  getArticleById,
  getCommentsByArticleId,
  postCommentByArticleId
};

// postCommentByArticleId not working
