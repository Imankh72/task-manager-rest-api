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
