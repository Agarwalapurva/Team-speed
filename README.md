Team Name: YourTeamNameHere

Project Description  
This is a full stack Student Team Members Management Application. It allows users to add, view, and manage student team members with image upload functionality. The frontend is built using React.js, and the backend is powered by Node.js, Express, and MongoDB.

Installation Steps  

1. Clone the repository  
   git clone https colon slash slash github dot com slash yourusername slash yourteamname dot git

2. Navigate to the backend folder and install dependencies  
   cd backend  
   npm install

3. Navigate to the frontend folder and install dependencies  
   cd frontend  
   npm install

API Endpoints  

GET slash api slash members  
Returns a list of all members

POST slash api slash members  
Adds a new member with name, role, email, and image

GET slash api slash members slash colon id  
Returns details of a single member by ID

How to Run the App  

1. Start the backend server  
   cd backend  
   npm start  
   The backend will run on localhost port 5000

2. Start the frontend server  
   cd frontend  
   npm start  
   The frontend will run on localhost port 3000

Note  
Make sure MongoDB is running locally on port 27017.  
Image files are stored in the uploads folder on the server.  
