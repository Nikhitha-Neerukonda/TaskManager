# Task Manager API

This is a Task Manager API built with Node.js, Express.js, and MongoDB. The API allows users to register, log in, create, read, update, and delete tasks. Each user can only manage their own tasks, ensuring data integrity.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Task Routes](#task-routes)
- [Test Cases](#test-cases)
## Features

- User registration and authentication using JWT.
- CRUD operations for tasks.
- Each task is associated with a specific user.
- Secure endpoints that require authentication.
- Timestamps for tasks to track creation and update times.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- dotenv

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/taskmanagerbackend.git
    cd taskmanagerbackend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```env
    PORT=8000
    MONGO_URL=mongodb+srv://<username>:<password>@cluster0.msm7urr.mongodb.net/
    JWT_SECRET_KEY=your-secret-key
    DB_NAME=mydb4
    ```

4. **Start the server:**

    ```bash
    node index.js
    ```

    The server will start on the port specified in the `.env` file (default is 8000).

## Usage

After starting the server, you can use tools like Postman to interact with the API.

## API Endpoints

### User Routes

- **Register a new user**

    ```http
    POST /users/register
    ```

    Request Body:

    ```json
    {
      "name": "Neerukonda Lakshmi Nikhitha",
      "email": "2002lakshminikhitha@gmail.com",
      "password": "neerukonda@123"
    }
    ```

    Response:

    ```json
    {
      "user": {
        "name": "Neerukonda Lakshmi Nikhitha",
        "email": "2002lakshminikhitha@gmail.com"
        "_id": "5f50c31f9e7b5c1a3c8d1f00",
        "createdAt": "2024-05-24T08:00:00.000Z",
        "updatedAt": "2024-05-24T08:00:00.000Z"
      },
      "message": "User Created Successfully"
    }
    ```

- **Log in a user**

    ```http
    POST /users/login
    ```

    Request Body:

    ```json
    {
      "email": "2002lakshminikhitha@gmail.com",
      "password": "password"
    }
    ```

    Response:

    ```json
    {
      "user": {
        "_id": "5f50c31f9e7b5c1a3c8d1f00",
        "name": "Neerukonda Lakshmi Nikhitha",
        "email": "2002lakshminikhitha@gmail.com",
        "password":"password",
        "createdAt": "2024-05-24T08:00:00.000Z",
        "updatedAt": "2024-05-24T08:00:00.000Z",
        "__v":0
      },
      "token": "jwt-token",
      "message": "Logged in successfully"
    }
    ```

### Task Routes

All task routes require a valid JWT token provided in the `Authorization` header as `Bearer <token>`.

- **Create a new task**

    ```http
    POST /tasks
    ```

    Request Body:

    ```json
    {
      "description": "Nodejs task",
      "completed": false
    }
    ```

    Response:

    ```json
    {
      "task": {
        "description": "Nodejs task",
        "completed": false,
        "_id": "5f50c31f9e7b5c1a3c8d1f01",
        "owner": "5f50c31f9e7b5c1a3c8d1f00",
        "createdAt": "2024-05-24T08:00:00.000Z",
        "updatedAt": "2024-05-24T08:00:00.000Z",
         "__v":0
      },
      "message": "Task Created Successfully"
    }
    ```

- **Get all tasks of the logged-in user**

    ```http
    GET /tasks
    ```

    Response:

    ```json
    {
      "tasks": [
        {
          "_id": "5f50c31f9e7b5c1a3c8d1f01",
          "description": "Nodejs task",
          "completed": false,
          "owner": "5f50c31f9e7b5c1a3c8d1f00",
          "createdAt": "2024-05-24T08:00:00.000Z",
          "updatedAt": "2024-05-24T08:00:00.000Z",
          "__v":0
        }
      ],
      "count": 1,
      "message": "Tasks Fetched Successfully"
    }
    ```

- **Get a specific task by ID**

    ```http
    GET /tasks/:id
    ```

    Response:

    ```json
    {
      "task": {
        "_id": "5f50c31f9e7b5c1a3c8d1f01",
        "description": "Node task",
        "completed": false,
        "owner": "5f50c31f9e7b5c1a3c8d1f00",
        "createdAt": "2024-05-24T08:00:00.000Z",
        "updatedAt": "2024-05-24T08:00:00.000Z",
        "__v":0
      },
      "message": "Task Fetched Successfully"
    }
    ```

- **Update a task by ID**

    ```http
    PATCH /tasks/:id
    ```

    Request Body :

    ```json
    {
      "description": "Updated Task Description",
      "completed": true
    }
    ```

    Response:

    ```json
    {
      "message": "Task Updated Successfully"
    }
    ```

- **Delete a task by ID**

    ```http
    DELETE /tasks/:id
    ```

    Response:

    ```json
    {
      "task": {
        "_id": "5f50c31f9e7b5c1a3c8d1f01",
        "description": "New Task",
        "completed": false,
        "owner": "5f50c31f9e7b5c1a3c8d1f00",
        "createdAt": "2024-05-24T08:00:00.000Z",
        "updatedAt": "2024-05-24T08:00:00.000Z"
        "__v":0
      },
      "message": "Task Deleted Successfully"
    }
    ```
## test-cases

To run the tests, use the following command:

```bash
npm test



