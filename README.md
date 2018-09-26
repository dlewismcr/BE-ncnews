# Northcoders News Back End

Northcoders News Back End is a RESTful API which is used for the Northcoders News project.

It contains a database of all articles, comments, topics & users. All available endpoints are listed in the "Routes" section.

It is hosted on: 
https://dl-ncnews.herokuapp.com/

## Getting Started

Clone this repository:
```
$ git clone https://github.com/dlewismcr/BE-ncnews
```
## Installation
```
$ npm install
```
Will install the following packages:
<br>
<br>
Dependencies:
- body-parser: ^1.18.3
- cors: ^2.8.4
- express: ^4.16.3
- mongoose: ^5.2.6
<br>
Dev Dependencies:
<br>
- chai: ^4.1.2
- mocha: ^5.0.5
- nodemon: ^1.17.4
- supertest: ^3.0.0

You will also need a config folder containing the following index.js file:
```js
const NODE_ENV = process.env.NODE_ENV || "development";

const config = {
  development: {
    DB_URL: "mongodb://localhost:27017/northcoders_news",
    PORT: 9091
  },
  test: {
    DB_URL: "mongodb://localhost:27017/northcoders_news_test",
    PORT: 9090
  },
  production: {
    DB_URL: "Insert your mlab url"
  }
};

module.exports = config[NODE_ENV];
```
### Seeding the database
Install MongoDB:
```
$ mongo --version
```
Start mongoDB (in a seperate terminal):
```
$ mongod
```
Seed the database:
```
$ npm run seed:dev
```
Start the server:
```
$ npm run dev
```
You will now be able to open the app in your browser (or Postman) using the following url:
```
localhost:9090/api
```
## Routes

The end points are as follows:<br>
<br>

```http
GET /api
```

Serves an HTML page with documentation for all the available endpoints
<br>
<br>

```http
GET /api/topics
```

Get all the topics<br>
<br>

```http
GET /api/topics/:topic_slug/articles
```

Return all the articles for a certain topic, e.g: `/api/topics/football/articles`<br>
<br>

```http
POST /api/topics/:topic_slug/articles
```

Add a new article to a topic. This route requires a JSON body with title and body key value pairs
e.g: `{ "title": "new article", "body": "This is my new article content"}`<br>
<br>

```http
GET /api/articles
```

Returns all the articles<br>
<br>

```http
GET /api/articles/:article_id
```

Get an individual article<br>
<br>

```http
GET /api/articles/:article_id/comments
```

Get all the comments for a individual article<br>
<br>

```http
POST /api/articles/:article_id/comments
```

Add a new comment to an article. This route requires a JSON body with body and created_by key value pairs
e.g: `{"body": "This is my new comment", "created_by": <mongo id for a user>}`<br>
<br>

```http
PUT /api/articles/:article_id
```

Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down'
e.g: `/api/articles/:article_id?vote=up`<br>
<br>

```http
PUT /api/comments/:comment_id
```

Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down'
e.g: `/api/comments/:comment_id?vote=down`<br>
<br>

```http
DELETE /api/comments/:comment_id
```

Deletes a comment<br>
<br>

```http
GET /api/users/:username
```

e.g: `/api/users/mitch123`

Returns a JSON object with the profile data for the specified user.<br>
<br>

## Testing

Run the following command in your terminal:
```
$ npm t
```

## Authors

- **Daniel Lewis**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

All of the tutors at Northcoders, Manchester, UK.
