# Toolbox

Introducing Toolbox, your backstage pass to streamlining company operations without the corporate jargon. This internal tool isn't just about managing employee profiles; it's your go-to for orchestrating time-off requests and expense management with finesse.

Imagine a digital haven where updating your profile is as easy as updating your social media status. Need a day off or a reimbursement for that business lunch? Toolbox has your back, offering seamless request and approval processes. So, let's banish the bureaucracy and embrace a smoother, more streamlined way of working with Toolbox by your side.

# Screenshot

#### Welcome to Toolbox!

<img src="./frontend/public/">

## User Access
#### My Profile: Manage your profile and keep your contact details updated

<img src="./frontend/public/">


#### Employee Directory: Find your work bestie or track down that elusive department head who's always one step ahead of the game

<img src="./frontend/public/">


#### Leave management: Keep track of your leave balance, upcoming time-off and submit leave application

<img src="./frontend/public/">


#### Expense management: Keep track of your expense claims and submit claims for approval

<img src="./frontend/public/">

## Manager Access
#### Approve direct report's leave application and/or expense claims 


## Admin Access
#### Admin Console: Create account for new employees and manage user access



# Technologies Used
- React
- JSX
- CSS
- Node JS
- Material UI
- Bootstrap
- AWS S3

# React Hierachy
# Entity Relationship Diagram (ERD)

# Getting Started

### Backend Setup

1. Run `npm init -y` to initialize the project and create a package.json file
2. Install all the packages and dependencies `npm i dotenv express-validator mongoose jsonwebtoken bcrypt uuid cors helmet express-rate-limit`
3. Create your .env file with the following variables:
   
```
PORT=5001
MONGODB_URI
ACCESS_SECRET=<YOUR_ACCESS_SECRET>
REFRESH_SECRET=<YOUR_REFRESH_SECRET>
```

### Frontend Setup
1. Run `npm i` to install all the dependencies
2. Run `npm i react-router-dom` to install react-router-dom
3. Run `npm i @mui/material @emotion/react @emotion/styled` to install Material UI
4. Run `npm i @mui/icons-material` to install Material UI icons
5. Run `npm i jwt-decode` to install jwt-decode
6. Create your .env file with the following variables:

```VITE_SERVER=http://localhost:5001```


# Next Steps
# References

