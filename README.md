🗓️ Appointment Management System

A full-stack appointment management system with secure authentication, role-based access, and CRUD operations for managing appointments.
Built with NestJS, MongoDB, and JWT for a professional backend structure.

🚀 Technologies Used

Backend: Express, Node.js, TypeScript

Database: PostgreSQL

Authentication: JWT (JSON Web Token)

Password Encryption: bcrypt

Logging & Dev Tools: Morgan, Nodemon

Frontend: React + Redux

Testing: Postman / Jest

⚙️ Installation & Local Setup

Clone the repository

git clone <REPO_URL>
cd <back>

Install dependencies

npm install


Configure environment variables

Create a .env file in the root directory with:

# Server configuration
PORT=<your_port>

# Database configuration (PostgreSQL)
DB_HOST=<your_db_host>
DB_PORT=<your_db_port>
DB_USER=<your_db_user>
DB_PASS=<your_db_password>
DB_NAME=<your_db_name>

# Authentication
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRES_IN=<jwt_expiration_in_seconds>

# Password encryption
BCRYPT_SALT_ROUNDS=<bcrypt_salt_rounds>


Run the server

npm run start:dev


✅ Server running at: http://localhost:3000

🛠️ API Endpoints

👤 Users
Method	Route	Description	Access
GET	/users	List all users	admin
GET	/users/:id	Get user by ID	admin / own
POST	/users/register	Register new user	public
POST	/auth/login	Login user (JWT)	public

📅 Appointments
Method	Route	Description	Access
GET	/turns	List all appointments	admin
GET	/turns/:id	Get appointment by ID	admin / own
POST /turns/schedule	Create new appointment	user / admin
PUT	/turns/cancel/:turnid	Update appointment	user / admin
🔑 Request / Response Examples
🧾 Register User

POST /users/register

{
    "name": "user",
    "email": "user@gmail.com",
    "birthdate": "24/02/1995",
    "nDni": "0000000000",
    "username": "user",
    "password": "user",
    "role": "user"
}

🔐 Login

POST /auth/login

{
    "username": "user",
    "password": "user"
}

Response:

{
    "login": true,
    "message": "Usuario logueado correctamente",
    "token": <JWTtoken>,
    "user": {
        "id": 1,
        "name": "user",
        "email": "user@gmail.com",
        "role": "user"
    }
}

📆 Create Appointment

POST /turns/schedule

Headers:
Authorization: Bearer <JWT_TOKEN>

Body:

{
    "date": "2025-10-22",
    "time": "20:00",
    "userId": "1"
}

Response:

{
    "date": "2025-10-22",
    "time": "20:00",
    "userId": "userId",
    "id": 1,
    "status": "active",
    "user": {
        "id": 1,
        "name": "user",
        "email": "user@gmail.com",
        "birthdate": "24/02/1995",
        "nDni": "000000000",
        "role": "user"
    }
}

🔒 Authentication & Role Management

All appointment routes require a valid JWT.

Roles:

user: can create, update, and delete their own appointments

admin: can manage all users and all appointments

✨ Features

✅ User registration and login with JWT
✅ Role-based access (user / admin)
✅ CRUD for appointments with validation
✅ Password encryption with bcrypt
✅ Clear request and response examples
✅ Ready for deployment and Postman testing

🧩 Backend Project Structure (Layered Architecture)

This project follows a Layered Architecture, separating concerns into controllers, services, and repositories to maintain scalability, testability, and clean code organization.
I decided to use this architecture because I wanted to build the project without using NestJS, in order to practice Express and structure a backend manually — focusing on understanding how each layer interacts and how to organize code in a professional way.

src/
 ├── config/
 ├── controllers/
 ├── dto/
 ├── entities/
 ├── interfaces/
 ├── middlewares/
 ├── repositories/
 ├── routes/
 ├── services/
 ├── index.ts
 ├── main.ts
.env
package.json
psconfig.json

🧠 Author

Developed by Francisco Patiño
📫 LinkedIn Profile : https://www.linkedin.com/in/francisco-pati%C3%B1o-b702b12b5/

💻 GitHub Profile: https://github.com/Franjamer1

💼 Portfolio: https://franjamer1.github.io/portfolio/
