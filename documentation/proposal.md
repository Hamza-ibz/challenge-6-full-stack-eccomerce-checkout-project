# Gadgets E-Commerce Platform

## Description
The Gadgets E-Commerce Platform is a comprehensive online marketplace designed specifically for electronic gadgets, catering to both tech enthusiasts and general consumers seeking products in the rapidly evolving tech industry. The platform serves as a centralized hub where users can explore and purchase a diverse range of gadgets, including smartphones, laptops, tablets, smartwatches, accessories, and more. Built upon the MERN (MongoDB, Express.js, React, Node.js) stack, the platform leverages modern web technologies to deliver an immersive and seamless shopping experience.

This full-stack application will offer robust performance, scalability, and security, ensuring a reliable and efficient service for both customers and administrators. It also includes a user-friendly interface that adapts seamlessly across various devices. Whether accessed via desktop browsers, tablets, or smartphones, the platform's responsive design ensures consistent usability and performance, enhancing accessibility and convenience for users

## Context
### Problem
In the fast-paced world of technology, consumers demand a user-friendly and secure platform to purchase the latest gadgets. However, many existing e-commerce platforms lack the necessary features and performance required to meet these demands. Issues such as complicated navigation, security vulnerabilities, and inefficient product management systems lead to poor user experiences and operational challenges for store administrators. Our project aims to solve these problems by creating a dedicated e-commerce platform for gadgets, focusing on user experience, security, and efficient management tools.

### Intended Users
- **Consumers**: Individuals looking for a convenient way to purchase a variety of electronic gadgets online. The platform will cater to tech enthusiasts and general consumers alike, ensuring an enjoyable shopping experience.
- **Store Administrators**: Managers and staff responsible for managing product listings, inventory, and roles. The platform will offer powerful tools to streamline the management of store operations, helping administrators efficiently track and manage products.

## Features
### User Authentication and Authorization
- **Registration**: Users can create an account by providing their name, email, and password. Passwords will be securely hashed using bcrypt before storing them in the database.
- **Login**: Registered users can log in using their email and password. JSON Web Tokens (JWT) will be used to manage user sessions securely, providing an additional layer of security.
- **Profile Management**: Users can view and update their profile information, including their name, email, and password. Profile updates will ensure data integrity and security.

### Product Management
- **Create Products**: Administrators can add new gadgets to the store, specifying details such as name, price, description, category, and images. The product creation form will ensure all necessary fields are completed accurately.
- **Read Products**: All users can view product listings. Each product will display essential information such as name, price, and images. 
- **Update Products**: Administrators can update product details, such as changing the price. This feature ensures that product information remains current and accurate.
- **Delete Products**: Administrators can remove products from the store if they are no longer available for sale. This feature helps maintain an up-to-date product catalog and manage inventory efficiently.

### Shopping Cart
- **Add to Cart**: Users can add products to their shopping cart. The cart will store product IDs and quantities, allowing users to review their selections before purchasing.
- **View Cart**: Users can view the contents of their cart, including product names, prices, quantities, and the total price. The cart view will provide a clear summary of the items selected for purchase.
- **Update Cart**: Users can update the quantity of products in their cart or remove products entirely. This flexibility allows users to adjust their selections as needed before proceeding to checkout.
- **Checkout**: Users can proceed to checkout, where they will confirm their order details and provide payment information.

### Order Management
- **Place Orders**: Users can place orders by proceeding through the checkout process. Orders will include details such as product IDs, quantities, total price, and user information. Order placement will trigger confirmation emails and updates in the order management system.
- **View Orders**: Users can view their order history, including order details and statuses. This feature provides transparency and allows users to track their purchases.

### Search and Filter
- **Search**: Users can search for products by name or keyword. The search functionality will provide quick and accurate results, enhancing the user experience.
- **Filter**: Users can filter products based on categories, price range, and other criteria to find exactly what they're looking for. The filtering options will help users narrow down their choices and find the desired products quickly.

## User Interface
### Wireframe
- **Home Page**: Displaying featured products.
<img src="/images/Home.png" width="200" style="display: block; margin: 0 auto" />
- **Product Page**: Detailed view of a single product with an option to add to cart.
- **Cart Page**: Summary of items in the cart with a checkout button.
- **Profile Page**: User information and order history.

## RESTful Routing
### Routes
- **User Routes**:
  - `POST /users/register`: Register a new user.
  - `POST /users/login`: Authenticate a user.
  - `GET /users/profile`: Get user profile.
  - `PUT /users/profile`: Update user profile.
- **Product Routes**:
  - `GET /products`: Get all products.
  - `GET /products/:id`: Get a single product by ID.
  - `POST /products`: Create a new product.
  - `PUT /products/:id`: Update a product by ID.
  - `DELETE /products/:id`: Delete a product by ID.
- **Order Routes**:
  - `POST /orders`: Place a new order.
  - `GET /orders`: Get all orders for a user.
  - `GET /orders/:id`: Get order details by ID.
  - `PUT /orders/:id`: Update order status.
- **Cart Routes**:
  - `POST /cart`: Add an item to the cart.
  - `GET /cart`: Get all items in the cart.
  - `DELETE /cart/:id`: Remove an item from the cart.

### Headers and Payloads
- **Authorization Header**: `Authorization: Bearer <token>`
- **Content-Type Header**: `Content-Type: application/json`

## Architecture Diagram

## Description

The architecture of the E-Commerce Platform is designed to ensure scalability, maintainability, and efficient data handling. The application is built using the MERN stack, which includes MongoDB, Express.js, React, and Node.js. Each component has a specific role in the architecture, ensuring a clear separation of concerns and efficient communication between different parts of the application.

## Diagram

```plaintext
                                +---------------------+
                                |       User          |
                                +----------+----------+
                                           |
                                           | User Interaction
                                           |
                                +----------v----------+
                                |   Frontend (React)  |
                                +----------+----------+
                                           |
                                           | HTTP Requests
                                           |
                                +----------v----------+
                                |  Backend (Node.js   |
                                |  + Express.js)      |
                                +----------+----------+
                                           |
                                           | Calls
     +--------------------+----------------+--------------------+-------------------+
     |                    |                |                    |                   |
+----v----+         +-----v-----+     +----v----+         +-----v-----+     +------v------+
| Product |         |   Order   |     |   Cart  |         |  User      |     |    User     |
|Management|        |Management |     |Management|        | Profile    |     |  Authentication |
+----+----+         +-----+-----+     +----+----+         +-----+-----+     +------^------+
     |                    |                |                    |                   |
     |                    |                |                    |                   |
     +---------+----------+                |                    +---------+---------+
               |                           |                              |
               |                           |                              |
               |                           |                              |
+--------------v---------------------------v------------------------------v----------+
|                                           Database (MongoDB)                        |
+-------------------------------------------------------------------------------------+
               |                           |                              |
               |                           |                              |
               |                           |                              |
     +---------v----------+       +--------v---------+         +---------v--------+
     |                    |       |                  |         |                  |
+----v-----+       +------v------+       +-----------v----+         +------------v---+
| Products |       | Order Items |       | User Information |         | Authentication  |
+----------+       +-------------+       +-----------------+         +----------------+
```

### Components

1. **User**: The end-user interacting with the platform.
2. **Frontend (React)**: The user interface, built with React.
3. **Backend (Node.js + Express.js)**: Handles logic, routes, and communicates with the database.
4. **Product Management**: Handles CRUD operations for products.
5. **Order Management**: Manages orders placed by users.
6. **Cart Management**: Manages the shopping cart functionality.
7. **User Profile Management**: Manages user profiles and related information.
8. **User Authentication (JWT)**: Manages secure authentication and authorization.
9. **Database (MongoDB)**: Stores all the data related to products, orders, cart items, and user profiles.
    - **Products**: Collection to store product details.
    - **Order Items**: Collection to store details of each order.
    - **User Information**: Collection to store user profiles and related data.
    - **Authentication**: Collection to manage JWT tokens and secure user sessions.

### Data Flow

### User Interaction

- Users interact with the frontend, which sends HTTP requests to the backend.

### Backend Processing

- The backend processes these requests and interacts with the respective functionalities like Product Management, Order Management, Cart Management, and User Profile Management.

### Database Interaction

- Each functionality interacts with the MongoDB database to perform necessary data operations. Data is stored and retrieved from the relevant collections.



## Technologies
- **Frontend**: React, Bootstrap, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JSON Web Token (JWT)
- **Environment Management**: Dotenv
- **Testing Tools**: Mocha, Chai
- **Deployment**: Github or Heroku

## Deployment
### Cloud Services
- **Deployment**: Deployed on Github or Heroku.

### Environment Variables
- `MONGO_URI`: Connection string for MongoDB.
- `JWT_SECRET`: Secret key for JWT.
- `PORT`: Port number for the server.
- `ACCESS_KEY_ID`: Access key for deployment.
- `SECRET_ACCESS_KEY`: Secret access key for deployment.
