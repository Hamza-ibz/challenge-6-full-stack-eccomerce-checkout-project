# Running a Project: Backend and Frontend

## Steps to Run the Project Locally
### Backend (Node.js)
Prerequisites:
- Node.js installed (version 14.x or higher recommended)
- MongoDB installed and running locally or MongoDB Atlas account for cloud database hosting
  
Setup:
- Clone the backend repository from Git.
- Navigate to the backend directory.
- Install dependencies using npm install.
- Create a .env file and configure environment variables like PORT, DB_URI, and JWT_SECRET.


### Frontend (React)
Prerequisites:
- Node.js installed (version 14.x or higher recommended)
- npm (Node Package Manager) or yarn installed
  
Setup:
- Clone the frontend repository from Git.
- Navigate to the frontend directory.
- Install dependencies using npm install.

### How to Run Frontend
- Development Mode :- npm run dev
- This command starts the Vite development server. By default, it runs on http://localhost:3000.

### Testing
- Test the code by runninG :- npm test
- Executes tests using vitest. Use npm run coverage to generate test coverage reports.

### How to Run Backend
- Start Development Server:- npm start
- Test the code by runninG :- npm test


## Running the Entire Application
To run the entire application:

- Ensure MongoDB is running.
- Start the backend server using npm start or npm run prod.
- Start the frontend React application using npm run dev.
- Access the application in your browser at http://localhost:3000 (or another specified port).


## Hosted

Backend (Hosted on Render)
- Deployment Platform: Render
- Description: Render provides a reliable hosting environment for Node.js applications, ensuring scalability and performance.
  
Frontend (Hosted on Netlify)
- Deployment Platform: Netlify
- Description: Netlify is used to host static websites and frontend applications, offering seamless integration with Git and automated deployment workflows.

### Deployment Details
Backend Deployment:
- Deployed on Render for Node.js hosting.
- Ensure environment variables are configured in the Render dashboard or .env file.

Frontend Deployment:
- Hosted on Netlify for static site hosting.
- Connect Netlify to your Git repository for automated deployments.

## Links

frontend app:-

- https://668646b5130ba97ea33380b2--radiant-bombolone-31bc03.netlify.app/login

Backend app:-

- https://challenge-6-full-stack-capstone-project.onrender.com/users