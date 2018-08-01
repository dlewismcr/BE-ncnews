const mongoose = require("mongoose");
const { Article, Comment, Topic, User } = require("../models");
const {
  formatArticleData,
  formatCommentData,
  formatTopicData,
  formatUserData
} = require("../utils");
const seedDb = ({ articleData, topicData, userData, commentData }) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([
        Topic.insertMany(formatTopicData(topicData)),
        User.insertMany(formatUserData(userData))
      ]);
    })
    .then(([topicDocs, userDocs]) => {
      return Promise.all([
        Article.insertMany(formatArticleData(articleData, userDocs)),
        userDocs
      ]);
    })
    .then(([articleDocs, userDocs]) => {
      return Comment.insertMany(
        formatCommentData(commentData, userDocs, articleDocs)
      );
    });
};

module.exports = seedDb;
