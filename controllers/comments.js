const { Comment } = require("../models");

const getAllComments = (req, res, next) => {
  Comment.find()
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

const putCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { vote } = req.query;
  let num = 0;
  if (vote === "up") num = 1;
  if (vote === "down") num = -1;

  Comment.findByIdAndUpdate(comment_id, { $inc: { votes: num } }, { new: true })
    .then(comment => {
      res.status(200).send({ comment });
      // msg thank you for voting
    })
    .catch(next);
};

const deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  Comment.findByIdAndDelete(comment_id)
    .then(comment => {
      res.status(200).send({ comment });
      // msg comment delete success
    })
    .catch(next);
};

module.exports = {
  getAllComments,
  putCommentById,
  deleteCommentById
};
