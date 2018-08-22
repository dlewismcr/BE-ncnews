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
      if (article.length !== 0) {
        //   async - returns udefined as is?
        //   let comLen = Comment.find({ belongs_to: article_id }).length;
        //   console.log(article, comLen);
        //   article.comments = comLen;
        res.status(200).send({ article });
      }
      next({ status: 400, msg: "Article not found" });
    })
    .catch(next);
};

// const getArticleById = (req, res, next) => {
//   const { article_id } = req.params;
//   Article.find({ _id: article_id })
//     .then(article => {
//       article.length !== 0
//         ? res.status(200).send({ article })
//         : next({ status: 400, msg: "Article not found" });
//     })
//     .catch(next);
// };

const getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  Comment.find({ belongs_to: article_id })
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
    created_by: req.body.created_by
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
