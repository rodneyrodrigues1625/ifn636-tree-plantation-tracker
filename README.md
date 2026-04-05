# LeafLine - Tree Plantation Tracker

LifeLine is a digital system designed to support planning, monitoring, recording and management of tree plantation activities. The purpose of this system is to provide a structured application that will allow users to record and maintain accurate data of trees planted as well as record readings of maintenance logs. The system also captures geo-location of planted trees as well as assists in generating decision making reports.

## Project overview

The application allows users to:
- register a new account
- log in securely
- view and update their profile
- create tree records
- view tree records
- edit tree records
- delete tree records

The project uses a React frontend, an Express/Node.js backend, and MongoDB Atlas for data storage.

### Frontend
- React
- React Router
- Axios
- Tailwind utility 

### Backend
- Node.js
- Express
- Mongoose
- JWT authentication
- bcrypt

### Testing and CI
- Mocha
- Chai
- Sinon
- GitHub Actions

### Deployment
- AWS EC2
- PM2
- MongoDB Atlas

## Folder structure

```text
ifn636-tree-plantation-tracker/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── test/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   └── build/
├── .github/
│   └── workflows/
└── README.md
```

## Local setup instructions
### 1. Clone the repository

```bash
git clone https://github.com/rodneyrodrigues1625/ifn636-tree-plantation-tracker.git
cd ifn636-tree-plantation-tracker
```

### 2. Install dependencies

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### 3. Configure backend environment variables

Create a file at `backend/.env` with:

```env
MONGO_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING
JWT_SECRET=2J8zqkP7VN6bxzg+Wy7DQZCA3Yx8mF3Bl0kch6HYtFs=
PORT=5001
```

### 4. Run backend

```bash
cd backend
npm start
```

### 5. Run frontend

```bash
cd frontend
npm start
```

## Backend tests

Run tests with:

```bash
cd backend
npm test
```

## GitHub Actions

The GitHub Actions workflow is stored in `.github/workflows/ci.yml` and runs backend tests on pushes and pull requests to `main`.

## EC2 deployment summary

The app was deployed on an AWS EC2 Ubuntu instance, with the frontend build served through the Express backend on port `5001`, and the Node process managed through PM2.

## Public URL


```text
http://3.107.208.201:5001
```

## Demo credentials

If your tutor requires a demo account, add it here before submission:

```text
Email:rodney123@gmail.com
Password: Ifn636
```
