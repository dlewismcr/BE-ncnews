const { Comment } = require("../models");

const putCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { vote } = req.query;
  let num = 0;
  if (vote === "up") num = 1;
  if (vote === "down") num = -1;

  // {new:true} shows the updated comment rather than the original
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
  putCommentById,
  deleteCommentById
};
