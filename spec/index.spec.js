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
    it("GET /topics", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("topics");
          expect(res.body.topics.length).to.equal(2);
          expect(res.body.topics[1].slug).to.equal("cats");
        });
    });
    it("GET /topics/:topic_slug/articles", () => {
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
    it("GET /topics/:topic_slug/articles invalid topic", () => {
      return request.get("/api/topics/bananas/articles").expect(404);
    });
    it("POST /topics/:topic_slug/articles", () => {
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
    describe("/articles", () => {
      it("GET /articles", () => {
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
      it("GET /articles/:article_id", () => {
        return request;
        const article_id = articleDocs[3]._id
          .get(`/api/articles/:${article_id}`)
          .expect(200)
          .then(res => {
            expect(res.body).to.have.all.keys("articles");
            expect(res.body.articles.length).to.equal(1);
            expect(res.body.articles[0].title).to.equal(
              "UNCOVERED: catspiracy to bring down democracy"
            );
          });
      });
    });
  });
});
