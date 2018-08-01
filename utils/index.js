const formatTopicData = topicData => {
  return topicData.map(topicDatum => {
    return {
      ...topicDatum
    };
  });
};

const formatUserData = userData => {
  return userData.map(userDatum => {
    return {
      ...userDatum
    };
  });
};

const formatArticleData = (articleData, userDocs) => {
  return articleData.map(articleDatum => {
    const created_by = userDocs.find(
      user => user.username === articleDatum.created_by
    )._id;
    return {
      ...articleDatum,
      belongs_to: articleDatum.topic,
      created_by
    };
  });
};

const formatCommentData = (commentData, userDocs, articleDocs) => {
  return commentData.map(commentDatum => {
    const created_by = userDocs.find(
      user => user.username === commentDatum.created_by
    )._id;
    const belongs_to = articleDocs.find(
      article => article.title === commentDatum.belongs_to
    )._id;
    return {
      ...commentDatum,
      belongs_to,
      created_by
    };
  });
};

module.exports = {
  formatArticleData,
  formatTopicData,
  formatUserData,
  formatCommentData
};
