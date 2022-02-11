# fullstack-twitter-clone (WIP) [LINK](https://socialist-poutine-39664.herokuapp.com/)

A minimal Fullstack Twitter clone made using Express and React.

* [Installation](#user-content-installation)
* [Usage](#user-content-usage)

## Installation

Because this app is made of two npm projects, there are two places to run `npm` commands:

1. **Node API server** at the root `./`
2. **React UI** in `client/` directory.

1. Clone project

```bash
git clone https://github.com/prajotsurey/fullstack-twitter-clone.git
```

2. Install dependencies for API server.

```bash
npm install
```
3. Install dependencies for React client.

In a separate terminal from the API server, start the UI:

```bash
cd client/

npm install
```

4. Start PostgreSQL server
5. Create database named 'twitter'
6. Add a user with the username `postgres` and password `password`
7. Create a .env file with the following data
```
PORT= *port number*
SECRET= *your secret string*
DEV_DATABASE='twitter'
```
7. Run Migrations
```bash
npx sequelize-cli db:migrate
```
## Usage

1. Start Server

```bash
npm run dev
```

2. Start client

In a separate terminal

```bash
cd client

npm start
```

## Features

1. Register User
2. Login
3. Create, bookmark and like tweets
3. Logout
