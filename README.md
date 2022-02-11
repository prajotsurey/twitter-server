# Twitter clone server built with ExpressJS, Sequelize ORM. [WEBSITE](https://fullstack-twitter-clone-frontend.vercel.app)

This server is the backend for a Fullstack Twitter Clone.

[Frontend repository](https://github.com/prajotsurey/fullstack-twitter-clone-frontend)

## Overview
This project is part of a Fullstack twitter app. It includes functionality to create a user, create a post, view posts, like and bookmark posts. It uses JsonWebToken and Local Storage for authentication.

I built this project using Sequelize ORM and ExpressJs. This was my first time tackling and ORM. I learned at a lot about setting it up and the problems that an ORM can cause when not used properly.

This server is deployed on AWS Elastic Beanstalk and usese AWS Load Balancers and AWS Cloudfront to provide SSL which is required to communicate with the frontend.

## Upcoming additions
Ability to upload images.

## Contents

* [Installation](#user-content-installation)
* [Usage](#user-content-usage)
* [Deployment](#user-content-deployment)
* [Guides](#user-content-guides)
## Installation

1. Clone project

```bash
git clone https://github.com/prajotsurey/twitter-server.git
```

2. Install dependencies for API server.

```bash
npm install
```

4. Start PostgreSQL server
5. Create database named 'twitter'
6. Add a user with the username `postgres` and password `postgres`
7. Create a .env file with the following data
```
SECRET=<string>
PORT=<string>
NODE_ENV=development
DATABASE_URL=postgres://postgres:postgres@localhost:5432/reddit
CORS_ORIGIN=<url for your frontend>
```
## Usage

1. Start server

In a separate terminal
```bash
npm run dev
```

## Deployment

This server is deployed on AWS. It uses Elastic Beanstalk(EB) for deployment. EB requires you to upload a zip of the source code to deploy it.

1. Copy your project filed except .env, .git and node_modules a different location.

Your folder structure should look like this.

```bash
    ├── src
    ├── jest.config.js
    ├── package.json
    ├── package-lock.json
    └── .sequelizerc
```
2. REMOVE bcrypt FROM THE LIST OF DEPENDENCIES. 

EB runs npm install on it's on after code upload. This install breaks due to bcrypt requiring extra permissions. As a result it has to be removed from the dependencies. Instead, it needs to be installed after the 'npm install' is complete (which happens automatically at the beginning) and before 'npm start'.
To do this, edit the 'start' script in packge.json as follows:

3. Edit the 'start' script to the following

```bash
"start": "npm install bcrypt && node dist/index.js"
```
4. Make sure you do not have bcrypt in the dependencies in package.json
5. Create a zip containing the aforementioned files. These files need to be in the root level of the zip. Do not include the folder containing these files.

6. The zip is now ready to upload on Elastic Beanstalk.

## Guides

* [Deploying to aws EB](https://medium.com/swlh/deploy-https-node-postgres-redis-react-to-aws-ef252567200d). (Do not follow step 10. It uses certbot-auto to generate ssl certificate which is no longer supported/working. Follow below tutorial for enabling ssl)

* [Enabling SSL without a custom domain](https://www.linkedin.com/pulse/how-connect-your-backend-api-elastic-beanstalk-cloudfront-kamau/)

For some reason creating a load balanced environment does not work for this deployment.
Create a normal environment as specified on tutorial no. 1 and then follow the second tutorial to convert it into load balanced.
While changing the configuration of EB environment to 'loadbalanced' make sure to change the number of max instances to 1.


