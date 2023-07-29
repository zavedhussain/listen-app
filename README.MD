# LISTEN

LISTEN is a listening level recording app.

Record your listening level and keep track of your progress. After a meeting or before going to sleep, note down your level of listening as well the record the details of your emotions.

## Note

- To explore the app, use credential : (email:test@gmail.com, password: password)

- In order to show some data currently I am allowing multiple recordings to be done in a day. Restriction to only one recording per day as mentioned in problem statement can be done by setting the commented `createListening` instead of current one.

- I have tried to emulate the Co.LabX color pallete and have used the same favicon.

## Back-end

- Built with Node/Express and MongoDB.

- Provides API endpoint for storing, creating as well as deleting listening level data.

- User authectication and authorization done using JWT tokens.

- Error handling with custom classes.

- Uses third-party libraries for input sanitization and security.(Helmet, xss-clean)

## Front-end

- Built with React, Redux-Toolkit and Styled-components.

### Landing Page

![Landing Page](/client/src/assets/screenshots/landing.jpg?raw=true)

### Register/Login

![Register](/client/src/assets/screenshots/register.jpg?raw=true)
![Login](/client/src/assets/screenshots/login.jpg?raw=true)

### Dashboard

![Dashboard](/client/src/assets/screenshots/dashboard.jpg?raw=true)

### Add New

![Add New](/client/src/assets/screenshots/addnew.jpg?raw=true)

## Setup

To setup locally

- Clone repo.

### Back-end Setup

- Set mongodb URI,jwt key and jwt lifetime(eg:30d) in `.env` file

```
DB_URI=
JWT_SECRET=
JWT_LIFETIME=
```

```
cd server
npm install
npm run devstart
```

### Front-end Setup

```
cd client
npm install
npm run dev
```
