# 🚀 TaskFlow – Full-Stack Task Management Application

TaskFlow is a **full-stack task management web application** that helps users create, manage, update, complete, search, and delete their tasks through a simple and attractive interface.

The project demonstrates how a **frontend application communicates with a Java Spring Boot REST API and MySQL database**.

---

## 📌 Features

### 👤 User Management

* User Registration
* User Login
* Simple authentication
* User logout
* User-specific tasks

### 📝 Task Management

* Create new tasks
* View all tasks
* Update task status
* Mark tasks as completed
* Delete tasks
* Set task priority

  * LOW
  * MEDIUM
  * HIGH

### 🔍 Task Organization

* Search tasks
* Filter tasks by status
* Display task priority
* Display task completion status

### 🎨 User Interface

* Attractive dashboard
* Navigation toolbar
* Welcome message
* Logout button
* Responsive design
* Clean and simple UI

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API

### Backend

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* Hibernate
* REST APIs

### Database

* MySQL

### Development Tools

* IntelliJ IDEA / VS Code
* MySQL
* Git
* GitHub
* Live Server

---

## 🏗️ Project Architecture

```text
                    ┌─────────────────────┐
                    │      Frontend       │
                    │                     │
                    │ HTML + CSS + JS     │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │       Backend       │
                    │                     │
                    │    Spring Boot      │
                    │    Controllers      │
                    │    Services         │
                    │    Repositories     │
                    └──────────┬──────────┘
                               │
                               │ JPA / Hibernate
                               ▼
                    ┌─────────────────────┐
                    │      MySQL DB       │
                    │                     │
                    │    Users + Tasks    │
                    └─────────────────────┘
```

---

## 📂 Project Structure

```text
TaskFlow/
│
├── backend/
│   │
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── taskflow/
│   │       │           │
│   │       │           ├── BackendApplication.java
│   │       │           │
│   │       │           ├── controller/
│   │       │           │   ├── AuthController.java
│   │       │           │   └── TaskController.java
│   │       │           │
│   │       │           ├── model/
│   │       │           │   ├── User.java
│   │       │           │   └── Task.java
│   │       │           │
│   │       │           ├── repository/
│   │       │           │   ├── UserRepository.java
│   │       │           │   └── TaskRepository.java
│   │       │           │
│   │       │           └── service/
│   │       │               ├── UserService.java
│   │       │               └── TaskService.java
│   │       │
│   │       └── resources/
│   │           └── application.properties
│   │
│   └── pom.xml
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── style.css
│   └── script.js
│
└── README.md
```

---

## 🗄️ Database Setup

Create a MySQL database:

```sql
CREATE DATABASE taskflow;
```

Select the database:

```sql
USE taskflow;
```

Create the users table:

```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

Create the tasks table:

```sql
CREATE TABLE tasks (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(30) DEFAULT 'PENDING',
    priority VARCHAR(30) DEFAULT 'MEDIUM',
    user_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## ⚙️ Backend Configuration

Update:

```text
backend/src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/taskflow
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080
```

Replace:

```text
YOUR_PASSWORD
```

with your local MySQL password.

> ⚠️ **Security:** Never upload your real MySQL password to GitHub.

---

## ▶️ How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/sukhavasibalasri/TaskFlow.git
```

Move into the project:

```bash
cd TaskFlow
```

---

### 2. Start MySQL

Make sure your MySQL server is running.

Create the `taskflow` database.

---

### 3. Start the Spring Boot Backend

Open the `backend` folder in your IDE.

Run:

```text
BackendApplication.java
```

The backend will start at:

```text
http://localhost:8080
```

---

### 4. Start the Frontend

Open the `frontend` folder in VS Code.

Right-click:

```text
index.html
```

Select:

```text
Open with Live Server
```

The TaskFlow application will open in your browser.

---

## 🔗 REST API Endpoints

### 🔐 Authentication

#### Register User

```http
POST /api/auth/register
```

Example request:

```json
{
    "name": "Bala",
    "email": "bala@example.com",
    "password": "1234"
}
```

---

#### Login User

```http
POST /api/auth/login
```

Example request:

```json
{
    "email": "bala@example.com",
    "password": "1234"
}
```

---

### 📋 Tasks

#### Get User Tasks

```http
GET /api/tasks/{userId}
```

Example:

```text
GET /api/tasks/1
```

---

#### Get Single Task

```http
GET /api/tasks/single/{id}
```

Example:

```text
GET /api/tasks/single/1
```

---

#### Create Task

```http
POST /api/tasks/{userId}
```

Example:

```json
{
    "title": "Learn Spring Boot",
    "description": "Complete TaskFlow backend",
    "priority": "HIGH"
}
```

---

#### Update Task

```http
PUT /api/tasks/{id}
```

Example:

```json
{
    "title": "Learn Spring Boot",
    "description": "Complete Spring Boot project",
    "priority": "HIGH",
    "status": "COMPLETED"
}
```

---

#### Delete Task

```http
DELETE /api/tasks/{id}
```

Example:

```text
DELETE /api/tasks/1
```

---

## 🔄 Application Flow

```text
User
 │
 ▼
Register
 │
 ▼
Login
 │
 ▼
Dashboard
 │
 ├── Create Task
 │
 ├── View Tasks
 │
 ├── Complete Task
 │
 ├── Delete Task
 │
 ├── Search Tasks
 │
 └── Filter Tasks
 │
 ▼
Logout
```

---

## 📸 Screenshots

### 🏠 Home Page

<img width="941" height="386" alt="Screenshot 2026-09-08 201648" src="https://github.com/user-attachments/assets/8e336022-c538-4f6d-a0b1-28d0875e7367" />


### 🔐 Login Page
<img width="879" height="395" alt="Screenshot 2026-09-08 202051" src="https://github.com/user-attachments/assets/e5bced33-ca12-40bc-bfa4-ed47c359f495" />


### 📋 Register
<img width="922" height="431" alt="TaskFlow Task Management" src="https://github.com/user-attachments/assets/7646d7b0-d788-4091-9e46-e21c36d1b103" />


### ✅ Task Management
<img width="893" height="461" alt="TaskFlow Home Page" src="https://github.com/user-attachments/assets/24a84ca4-07dd-44d3-a5fc-7acd6fd47d2a" />


---

## 🔐 Current Authentication

The current version uses **simple authentication** through the Spring Boot backend.

User information is temporarily stored in browser `localStorage`:

```javascript
localStorage.setItem("userId", user.id);
localStorage.setItem("userName", user.name);
```

Logout removes these values:

```javascript
localStorage.removeItem("userId");
localStorage.removeItem("userName");
```

---

## 🚀 Future Enhancements

The project can be improved with:

* 🔐 JWT authentication
* 🔒 Password encryption using BCrypt
* 👤 User profile management
* 📅 Task due dates
* 🏷️ Task categories
* 📊 Task statistics
* 🌙 Dark mode
* ✏️ Edit task directly from dashboard
* 🔔 Task reminders
* 📱 Improved mobile responsiveness
* ☁️ Cloud deployment
* 🐳 Docker support
* 🔎 Advanced task filtering
* 📄 Pagination
* 🛡️ Role-based authorization

---

## 🎯 Learning Outcomes

Through this project, I learned and practiced:

* Building REST APIs using Spring Boot
* Creating CRUD operations
* Connecting Spring Boot with MySQL
* Using Spring Data JPA
* Working with Hibernate
* Creating frontend interfaces using HTML and CSS
* Connecting frontend and backend using JavaScript Fetch API
* Handling JSON data
* Implementing basic user authentication
* Managing browser localStorage
* Organizing a full-stack application
* Using Git and GitHub for version control

---

## 👨‍💻 Author

**Bala Sri Sukhavasi**

B.Tech – Computer Science and Engineering
Prasad V. Potluri Siddhartha Institute of Technology

---

## ⭐ If You Like This Project

If you find this project useful, consider giving it a ⭐ on GitHub!

---

## 📄 License

This project is created for **educational and learning purposes**.
