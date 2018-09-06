const { Article, Comment } = require("../models");

// const getAllArticles = (req, res, next) => {
//   Article.find()
//     .populate("created_by")
//     .then(articles => {
//       res.status(200).send({ articles });
//     })
//     .catch(next);
// };
const getAllArticles = (req, res, next) => {
  Article.find()
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
      console.log(articles);
      const commentArticles = articles.map(article => {
        article[0].commentCount = article[1];
        return article[0];
      });
      res.status(200).send({ articles: commentArticles });
    })
    .catch(next);
};

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  Article.findOne({ _id: article_id })
    .populate("created_by")
    .lean()
    .then(article => {
      return Promise.all([article, getCommentCount(article_id)]);
    })
    .then(([article, comCount]) => {
      if (article.length !== 0) {
        article.comment_count = comCount;
        res.status(200).send({ article });
      } else next({ status: 400, msg: "Article not found" });
    })
    .catch(next);
};

const getCommentCount = article_id => {
  return Comment.find({ belongs_to: article_id }).then(comment => {
    return comment.length;
  });
};

const getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  Comment.find({ belongs_to: article_id })
    .populate("created_by")
    .then(comment => {
      comment !== null
        ? res.status(200).send({ comment })
        : next({ status: 400, msg: "400: Article not found" });
    })
    .catch(next);
};

const postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  Comment.create({
    body: req.body.body,
    belongs_to: article_id,
    created_by: req.body.created_by,
    created_at: Date.now()
  })
    .then(comment => {
      return Comment.findOne({ _id: comment._id }).populate("created_by");
    })
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

const putArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { vote } = req.query;
  let num = 0;
  if (vote === "up") num = 1;
  if (vote === "down") num = -1;

  Article.findByIdAndUpdate(article_id, { $inc: { votes: num } }, { new: true })
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

module.exports = {
  getAllArticles,
  getArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
  putArticleById
};
