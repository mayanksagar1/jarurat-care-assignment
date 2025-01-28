# **Role-Based RESTful API with Node.js and Express**

A robust RESTful API built using **Node.js**, **Express.js**, and **MongoDB** with role-based access control, field validation, and JWT authentication.

---

## **Features**

- **CRUD API Implementation**:

  - `POST /create` - Create a new record.
  - `GET /all` - Retrieve all records.
  - `GET /byId/:id` - Retrieve a record by its unique ID.
  - `PUT /update/:id` - Update a record by its unique ID.
  - `DELETE /delete/:id` - Delete a record by its unique ID.

- **Role-Based Access Control**:

  - **Admin**: Full access to all routes.
  - **User**: Restricted access to `GET` routes (`/all`, `/byId/:id`).

- **Field Validation**:

  - Validates data formats, required fields, and unique constraints using **Joi**.

- **JWT Authentication**:

  - Secures routes with a JSON Web Token.
  - Token contains user information (e.g., role, ID) and is validated via middleware.

- **Database**:
  - MongoDB is used to store and manage data securely.

---

## **Technologies Used**

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Validation**: Joi
- **Tools**: Postman, Git, Vercel

---

## **Getting Started**

### **Prerequisites**

Ensure you have the following installed:

- **Node.js** (v14+)
- **MongoDB**
- **Postman** (optional for testing)

---

### **Installation**

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root folder.
   - Add the following variables:
     ```env
     PORT=5000
     NODE_ENV="development" || "production"
     MONGO_URI=<your-mongo-db-connection-string>
     JWT_SECRET=<your-jwt-secret-key>
     ```

4. Start the server:
   ```bash
   npm run dev
   ```

The API will run at `http://localhost:5000`.

---

## **API Endpoints**

### **1. Public Routes**

| Method | Endpoint    | Description                         | Access |
| ------ | ----------- | ----------------------------------- | ------ |
| POST   | `/register` | User Registration (returns Message) | Public |
| POST   | `/login`    | User login (returns JWT)            | Public |

### **2. Protected Routes**

| Method | Endpoint      | Description           | Access      |
| ------ | ------------- | --------------------- | ----------- |
| POST   | `/create`     | Create a new record   | Admin       |
| GET    | `/all`        | Get all records       | Admin, User |
| GET    | `/byId/:id`   | Get a record by ID    | Admin, User |
| PUT    | `/update/:id` | Update a record by ID | Admin       |
| DELETE | `/delete/:id` | Delete a record by ID | Admin       |

---

## **Screenshots**

### **1. Postman API Tests**

- Example of successful requests to `/create`, `/all`, `/byId/:id`.

### **2. Code Highlights**

- **Admin Auth Middleware**:
  ```javascript
  const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(403).send("not authorized as a admin");
    }
  };
  ```
- **User Auth Middleware**:

  ```javascript
  const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");
        next();
      } catch (error) {
        res.status(401).send("Not Authorized , token failed");
      }
    } else {
      res.status(401).send("Not Authorized , token not found");
    }
  };
  ```

---

## **Deployment**

The API is deployed on **Vercel** and can be accessed at:
**[Live API URL](https://your-api.vercel.app)**

---

## **Challenges Faced**

1. **Role-Based Access Control**:

   - Ensuring only authorized users access specific routes.
   - **Solution**: Middleware to validate user roles.

2. **Data Validation**:
   - Preventing invalid data from being stored in MongoDB.
   - **Solution**: Used **Joi** to enforce strict validation rules.

---

## **Future Enhancements**

- Add rate limiting for enhanced security.
- Implement pagination for the `GET /all` route.

---

## **Contributing**

Feel free to contribute to this project by submitting a pull request or reporting issues.

---

## **License**

This project is licensed under the MIT License.

---

## **Contact**

For any queries or feedback, reach out at:
**Email**: mayanksagar963@gmail.com  
**GitHub**: [MayankSagar1](https://github.com/mayanksagar1)
