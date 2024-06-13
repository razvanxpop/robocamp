# RoboCamp

RoboCamp is a web application that allows users to create and manage robots, and assign tasks to these robots. The application supports full CRUD operations for both users and robots, with in-memory storage for the development phase and server-side persistence for production. The application also includes user authentication, pagination, and real-time updates through web sockets.

## Features

- User Registration and Login
- Authentication with Token-Based Session Management
- CRUD Operations for Users, Robots, and Tasks
- Pagination for List Endpoints
- Real-Time Updates with Web Sockets
- Comprehensive Testing Suite
- Server-Side Validation
- Security Measures (SQL Injection Prevention, DDOS Mitigation, XSS Protection)
- Backend Deployment on AWS

## Repositories

- Client: [RoboCamp Client](https://github.com/razvanxpop/robocamp)
- Server: [RoboCamp Server](https://github.com/razvanxpop/robocamp-server)

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Python (for testing purposes)

### Installation

1. Clone the repositories:

```sh
git clone https://github.com/razvanxpop/robocamp.git
git clone https://github.com/razvanxpop/robocamp-server.git
```

2. Install dependencies for both client and server:

```sh
cd robocamp
npm install
cd ../robocamp-server
npm install
```

### Running the Application

1. Start the server:

```sh
cd robocamp-server
npm start
```

2. Start the client:

```sh
cd robocamp
npm start
```

### Running tests

To run the comprehensive test suite, use the following command in the server directory:

```sh
npm test
```

### API Documentation

The API provides endpoints for all CRUD operations for users, robots, and tasks. The endpoints are accessible via Postman or any other HTTP client.

### Users

- POST /api/users - Create a new user
- GET /api/users - Get a list of all users
- GET /api/users/:id - Get a specific user by ID
- PUT /api/users/:id - Update a specific user by ID
- DELETE /api/users/:id - Delete a specific user by ID

### Robots

- POST /api/robots - Create a new robot
- GET /api/robots - Get a list of all robots
- GET /api/robots/:id - Get a specific robot by ID
- PUT /api/robots/:id - Update a specific robot by ID
- DELETE /api/robots/:id - Delete a specific robot by ID

### Tasks

- POST /api/tasks - Create a new task
- GET /api/tasks - Get a list of all tasks
- GET /api/tasks/:id - Get a specific task by ID
- PUT /api/tasks/:id - Update a specific task by ID
- DELETE /api/tasks/:id - Delete a specific task by ID

### Security Considerations

The application includes measures to prevent common security vulnerabilities such as:

- SQL Injection: Using parameterized queries and ORM features.
- DDOS Mitigation: Implementing rate limiting and other protective measures.
- Cross-Site Scripting (XSS): Sanitizing inputs and using secure coding practices.

### Deployment

The backend is deployed on AWS. To deploy your own instance, follow these steps:

- Set up an AWS account and create an EC2 instance.
- SSH into the instance and clone the server repository.
- Install necessary dependencies and start the server.

```sh
git clone https://github.com/razvanxpop/robocamp-server.git
cd robocamp-server
npm install
npm start
```

