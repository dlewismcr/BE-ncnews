# Northcoders News

https://dl-ncnews.herokuapp.com/

A RESTful API which will be used for the Northcoders News project.

### Prerequisites

You will need to install the following software:

body-parser <br>
cors <br>
express <br>
mongoose

```
npm i body-parser
npm i cors
npm i express
npm i mongoose
```

### Use

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

## Authors

- **Daniel Lewis**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

All the tutors at Northcoders, Manchester, UK.
