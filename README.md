# Task Manager Rest API

## Content

- Introduction
- Technologies
- Setup
- API reference

### Introduction

Task manager rest api provides apis include tasks information that users who logged in to this app include whether task is completed or not

### Technologies

- Node.js
- Express
- MongoDB
- JWT

### Setup

Enter `npm run start` to init app

Enter `npm i `

### API reference

#### Sign up user

```http
POST /users/signUp
```

| Parameter  | Type     | Description    |
| :--------- | :------- | :------------- |
| `name`     | `string` | **Required**   |
| `email`    | `string` | **Required**   |
| `age`      | `number` | **Default=18** |
| `password` | `string` | **Required**   |

#### Login user

```http
POST /users/login
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

#### Logout user

```http
POST /users/logout
```

#### Logout all sessions

```http
POST /users/logoutAll
```

#### Get user profile

```http
GET /users/me
```

#### Update user

```http
PATCH /users/me
```

#### Delete user

```http
DELETE /users/me
```

#### Upload profile image

```http
POST /users/me/profileImage
```

Use `upload` key for form-data in body request

#### Get profile image

```http
GET /users/:id/profileImage
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `id`      | `number` | **Required** |

#### Delete profile image

```http
DELETE /users/me/profileImage
```

#### Create a task

```http
POST /tasks
```

| Parameter     | Type      | Description       |
| :------------ | :-------- | :---------------- |
| `description` | `string`  | **Required**      |
| `completed`   | `boolean` | **Default=false** |

#### Get all user tasks

```http
GET /tasks
```

#### Get a user task

```http
GET /tasks/:id
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `id`      | `number` | **Required** |

#### Update a user task

```http
PATCH /tasks/:id
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `id`      | `number` | **Required** |

#### Delete a user task

```http
DELETE /tasks/:id
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `id`      | `number` | **Required** |
