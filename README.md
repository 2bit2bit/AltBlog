# AltBlog
This is an api for a blogging app
---

Endpoints can be tested with thunder-collection_AltBlog.json file 

## Requirements
1. User should be able to register 
2. User should be able to login with Passport using JWT
3. Implement basic auth
4. Logged in and not logged in users should be able to get a list of published blogs created
5. Logged in and not logged in users should be able to to get a published blog
6. Logged in users should be able to create a blog
7. The owner of the blog should be able to update the state of the blog to published
8. The owner of a blog should be able to edit the blog in draft or published state
9. The owner of the blog should be able to delete the blog in draft or published state
10. The owner of the blog should be able to get a list of their blogs(paginated and filterable by state)
11. Test application
---
## Setup
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run  `npm start`

---
## Base URL
- https://expensive-tam-toad.cyclic.app/


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  firstname | string  |  required|
|  lastname  |  string |  required   |
|  email     | string  |  required  |
|  password |   string |  required  |



### Order
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  title |  string |  required |
|  description | string |  
|  author  |  string |  required  |
|  state   | string  |  required, enum: ['draft', 'published'], default:'draft'|
|  read_count   | number |  required, default: 0|
|  reading_time | string |  required  |
|  tags |  array | 
|  body |  string |  required,  |
|  timestamp |  date|  required |



## APIs
---

### Signup User

- Route: /signup
- Method: POST
- Body: 
```
{
  "email": "doe@example.com",
  "first_name": "jon",
  "last_name": "doe",
  "password": "Password1"
}
```

- Responses

Success
```
{
  "message": "Signup successful",
  "user": {
    "email": "doe@example.com",
    "first_name": "jon",
    "last_name": "doe",
    "password": "$2b$12$.7u9qXsNeY5FEra2YpZcbe07k7IQRfIr2A6UpvAkypHwIEPgHOPdW",
    "_id": "6366e224b6fc2915572e82bd",
    "__v": 0
  }
}
```
---
### Login User

- Route: /login
- Method: POST
- Body: 
```
{ 
  "email": "doe@example.com",
  "password": "Password1"
}
```

- Responses

Success
```
{
  "token": "eyJhbGciOiJIUz....."
}
```

---
### Create Article

- Route: /user/create-article
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
  "title": "Classes of Food",
  "description": "Different types of food nutrients",
  "tags": "food, health, nutrients",
  "body": "ea molestias quasi exercitationem repellat qui ipsa sit autea molestias quasi exercitationem repellat qui ipsa"
}
```

- Responses

Success
```
{{
  "title": "Classes of Food",
  "description": "Different types of food nutrients",
  "author": "6366e224b6fc2915572e82bd",
  "state": "draft",
  "read_count": 0,
  "reading_time": "less than 1 min",
  "tags": [
    "food",
    "health",
    "nutrients"
  ],
  "body": "ea molestias quasi exercitationem repellat qui ipsa sit autea molestias quasi exercitationem repellat qui ipsa",
  "_id": "6366e434b6fc2915572e82c1",
  "timestamp": "2022-11-05T22:31:16.626Z",
  "__v": 0
}
```
---
### Get Articles (logged in user)

- Route: user/articles
- Method: GET
- Header
  - Authorization: Bearer {token}
- Query Parameters: 
   - state
   - page (default: 0)
   - per_page (default: 5)
- Responses

Success
```
[
  {
    "_id": "6366e434b6fc2915572e82c1",
    "title": "Classes of Food",
    "description": "Different types of food nutrients",
    "author": "6366e224b6fc2915572e82bd",
    "state": "draft",
    "read_count": 0,
    "reading_time": "less than 1 min",
    "tags": [
      "food",
      "health",
      "nutrients"
    ],
    "body": "ea molestias quasi exercitationem repellat qui ipsa sit autea molestias quasi exercitationem repellat qui ipsa",
    "timestamp": "2022-11-05T22:31:16.626Z",
    "__v": 0
  },
  {
    "_id": "6366e434b6fc2915572e894r4",
    "title": "Classes of Food2",
    "description": "Different types of food nutrients",
    "author": "6366e224b6fc2915572e82bd",
    "state": "draft",
    "read_count": 0,
    "reading_time": "less than 1 min",
    "tags": [
      "food",
      "health",
      "nutrients"
    ],
    "body": "ea molestias quasi exercitationem repellat qui ipsa sit autea molestias quasi exercitationem repellat qui ipsa",
    "timestamp": "2022-11-05T22:31:16.626Z",
    "__v": 0
  }
]
```
---

### Update article State to Published

- Route: /edit-article/:articleId/update_state
- Method: PUT
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
  "_id": "6366e434b6fc2915572e82c1",
  "title": "Classes of Food",
  "description": "Different types of food nutrients",
  "author": "6366e224b6fc2915572e82bd",
  "state": "published",
  "read_count": 0,
  "reading_time": "less than 1 min",
  "tags": [
    "food",
    "health",
    "nutrients"
  ],
  "body": "ea molestias quasi exercitationem repellat qui ipsa sit autea molestias quasi exercitationem repellat qui ipsa",
  "timestamp": "2022-11-05T22:31:16.626Z",
  "__v": 0
}
```
---

### Edit Article

- Route: /edit-article/:articleId
- Method: PUT
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
  "title": "Classes of Food edited",
  "description": "Different types of food nutrients",
  "tags": "food, health, nutrients",
  "body": "ea molestias quasi exercitationem repellat qui ipsa sit autea molestias quasi exercitationem repellat qui ipsa"
}
```

- Responses

Success
```
{
  "_id": "6366e434b6fc2915572e82c1",
  "title": "Classes of Food edited",
  "description": "Different types of food nutrients",
  "author": "6366e224b6fc2915572e82bd",
  "state": "published",
  "read_count": 0,
  "reading_time": "less than 1 min",
  "tags": [
    "food",
    "health",
    "nutrients"
  ],
  "body": "ea molestias quasi exercitationem repellat qui ipsa sit autea molestias quasi exercitationem repellat qui ipsa",
  "timestamp": "2022-11-05T22:31:16.626Z",
  "__v": 0
}
```
---

### Delete article

- Route: /delete-article/:articleId
- Method: DELETE
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
  "acknowledged": true,
  "deletedCount": 1
}
```
---

### Home Page

- Route: /
- Method: GET
- Responses

Success
```
{
  "message": "welcome to AltBlog"
}
```
---

### Get Articles (not logged in user)

- Route: /articles
- Method: GET
- Query Parameters:
   - title
   - autho r
   - tags
   - order (asc || desc)
   - order_by (read_count, reading_time, timestamp)
   - page (default: 0)
   - per_page (default: 20)
- Responses

Success
```
[
  {
    "_id": "6366673c9af79dfeb37d2070",
    "title": "food food food",
    "description": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "author": "635f96b414c58db4e6070b6b",
    "state": "published",
    "re....ALL lIST PUBLISHED OF ARTICLES
```
---


### Get Article (not logged in user)

- Route: /articles/:articleId
- Method: GET
- Responses

Success
```
{
  "_id": "6366673c9af79dfeb37d2070",
  "title": "food food food",
  "description": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
  "author": {
    "_id": "635f96b414c58db4e6070b6b",
    "email": "emkin4real@gmail.com",
    "first_name": "Ephraim",
    "last_name": "Haruna"
  },
  "state": "published",
  "read_count": 4,
  "reading_time": "less than 1 min",
  "tags": [
    "food",
    "lifestyle"
  ],
  "body": "ea m.....t qui ipsa sit aut",
  "timestamp": "2022-11-05T13:38:04.213Z",
  "__v": 0
}
```
---



...

## Contributor
- Ephraim Haruna Mamman