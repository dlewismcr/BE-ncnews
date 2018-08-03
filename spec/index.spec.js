process.env.NODE_ENV = "test";
const app = require("../app");
const seedDb = require("../seed/seed");
const data = require("../seed/testData");
const { expect } = require("chai");
const request = require("supertest")(app);
const mongoose = require("mongoose");

describe("/api", () => {
  let articleDocs,
    commentDocs,
    topicDocs,
    userDocs,
    wrongId = mongoose.Types.ObjectId;
  beforeEach(() => {
    return seedDb(data).then(docs => {
      [articleDocs, commentDocs, topicDocs, userDocs] = docs;
    });
  });
  after(() => {
    return mongoose.disconnect();
  });
  describe("/topics", () => {
    it("GET /api/topics", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("topics");
          expect(res.body.topics.length).to.equal(2);
          expect(res.body.topics[1].slug).to.equal("cats");
        });
    });
    it("GET /api/topics/:topic_slug/articles", () => {
      return request
        .get("/api/topics/cats/articles")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("articles");
          expect(res.body.articles.length).to.equal(2);
          expect(res.body.articles[1].created_by).to.equal(
            userDocs[1]._id.toString()
          );
        });
    });
    it("GET /api/topics/:topic_slug/articles invalid topic", () => {
      return request.get("/api/topics/bananas/articles").expect(404);
    });
    it("POST /api/topics/:topic_slug/articles", () => {
      const newArticle = {
        title: "Test new article on cats",
        created_by: userDocs[1]._id.toString(),
        body: "Body of test new article on cats"
      };
      return request
        .post("/api/topics/cats/articles")
        .send(newArticle)
        .expect(201)
        .then(res => {
          expect(res.body).to.have.all.keys("article");
          expect(res.body.article).to.be.an("object");
          expect(res.body.article.title).to.equal(newArticle.title);
          expect(res.body.article.created_by).to.equal(newArticle.created_by);
          expect(res.body.article.body).to.equal(newArticle.body);
          return request.get("/api/topics/cats/articles");
        })
        .then(res => {
          expect(res.body.articles.length).to.equal(3);
        });
    });
  });
  describe("/articles", () => {
    it("GET /api/articles", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("articles");
          expect(res.body.articles.length).to.equal(4);
          expect(res.body.articles[3].created_by).to.equal(
            userDocs[1]._id.toString()
          );
        });
    });
    it("GET /api/articles/:article_id", () => {
      const article_id = articleDocs[3]._id;
      return request
        .get(`/api/articles/${article_id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("article");
          expect(res.body.article.length).to.equal(1);
          expect(res.body.article[0].title).to.equal(
            "UNCOVERED: catspiracy to bring down democracy"
          );
        });
    });
    it("GET /api/articles/:article_id invalid id", () => {
      const article_id = wrongId;
      return request.get(`/api/articles/${article_id}`).expect(404);
    });
    it("GET /api/articles/:article_id/comments", () => {
      const article_id = articleDocs[3]._id;
      return request
        .get(`/api/articles/${article_id}/comments`)
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("comment");
          expect(res.body.comment.length).to.equal(2);
          expect(res.body.comment[1].body).to.equal(
            "I am 100% sure that we're not completely sure."
          );
        });
    });

    it("POST /api/articles/:article_id/comments", () => {
      const article_id = articleDocs[3]._id;
      const newComment = {
        body: "Test new catspiracy comment",
        belongs_to: article_id.toString(),
        created_by: userDocs[1]._id.toString()
      };
      return request
        .post(`/api/articles/${article_id}/comments`)
        .send(newComment)
        .expect(201)
        .then(res => {
          expect(res.body).to.have.all.keys("comment");
          expect(res.body.comment).to.be.an("object");
          expect(res.body.comment.body).to.equal(newComment.body);
          expect(res.body.comment.belongs_to).to.equal(newComment.belongs_to);
          expect(res.body.comment.created_by).to.equal(newComment.created_by);
          return request.get(`/api/articles/${article_id}/comments`);
        })
        .then(res => {
          expect(res.body.comment.length).to.equal(3);
        });
    });
    it("POST /api/articles/:article_id/comments invalid article_id", () => {
      const article_id = wrongId;
      const newComment = {
        body: "Test new catspiracy comment",
        belongs_to: article_id.toString(),
        created_by: userDocs[1]._id.toString()
      };
      return request
        .post(`/api/articles/${article_id}/comments`)
        .send(newComment)
        .expect(404);
    });
    it("PUT /api/articles/:article_id changes vote up", () => {
      const article_id = articleDocs[3]._id;
      return request
        .put(`/api/articles/${article_id}?vote=up`)
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("article");
          expect(res.body.article.votes).to.equal(1);
        });
    });
    it("PUT /api/articles/:article_id changes vote down", () => {
      const article_id = articleDocs[3]._id;
      return request
        .put(`/api/articles/${article_id}?vote=down`)
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("article");
          expect(res.body.article.votes).to.equal(-1);
        });
    });
    it("PUT /api/articles/:article_id changes vote down invalid article_id", () => {
      const article_id = wrongId;
      return request.put(`/api/articles/${article_id}?vote=down`).expect(404);
    });
  });
  describe("/comments", () => {
    it("PUT /api/comments/:comment_id changes vote up", () => {
      const comment_id = commentDocs[0]._id;
      return request
        .put(`/api/comments/${comment_id}?vote=up`)
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("comment");
          expect(res.body.comment.votes).to.equal(8);
        });
    });
    it("PUT /api/comments/:comment_id changes vote down", () => {
      const comment_id = commentDocs[1]._id;
      return request
        .put(`/api/comments/${comment_id}?vote=down`)
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("comment");
          expect(res.body.comment.votes).to.equal(18);
        });
    });
    it("PUT /api/comments/:comment_id invalid comment_id", () => {
      const comment_id = wrongId;
      return request.put(`/api/comments/${comment_id}?vote=down`).expect(404);
    });
    it("DELETE /api/comments/:comment_id", () => {
      const comment_id = commentDocs[1]._id;
      return request
        .delete(`/api/comments/${comment_id}`)
        .expect(200)
        .then(() => {
          return request.get("/api/comments");
        })
        .then(res => {
          expect(res.body.comments.length).to.equal(7);
        });
    });
    it("DELETE /api/comments/:comment_id invalid comment_id", () => {
      const comment_id = wrongId;
      return request.delete(`/api/comments/${comment_id}`).expect(404);
    });
  });
  describe("/users", () => {
    it("GET /api/users/:username", () => {
      const username = userDocs[1].username.toString();
      return request
        .get(`/api/users/${username}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("user");
          expect(res.body.user.length).to.equal(1);
          expect(res.body.user[0].username).to.equal(username);
        });
    });
    it("GET /api/users/:username invalid username", () => {
      const username = "invalid";
      return request.get(`/api/users/${username}`).expect(404);
    });
  });
});
