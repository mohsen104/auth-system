
# Auth-System

A simple example of backend authentication implementation with node js, express js and mongoose

## Getting Started

First, run the development server:

```bash
npm run dev
```
## API Reference

#### Signup

```http
  POST /api/user/signup
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. username of user to fetch |
| `email`      | `string` | **Required**. Email must be unique |
| `password`      | `string` | **Required** *minlength:6* |

#### Login

```http
  POST /api/user/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `identifier`      | `string` | **Required**. username or email |
| `password`      | `string` | **Required** *minlength:6* |

#### Logout

```http
  GET /api/user/logout
```

#### Get Me

```http
  GET /api/user/me
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `identifier`      | `string` | **Required**. username or email |
| `password`      | `string` | **Required** *minlength:6* |

## Features

- body-parser
- cookie-parser
- cors
- bcryptjs
- jsonwebtoken
- cookie
- dotenv