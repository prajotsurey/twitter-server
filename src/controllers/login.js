const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../models');

const loginRouter = require('express').Router();

loginRouter.post('/', async(request, response) => {
  const body = request.body;
  const user = await models.user.findOne({ 
    where : {username : body.username },
    attributes: {
      include:['password_hash']
    }
  });

  //returning errors with field information to update
  //formik form and display errors in the fields
  if (!user) {
    return response.status(401).send({error: [{
      field: 'username',
      message: 'username is incorrect'
    }] });
  }

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.password_hash); //comparing recieved password and stored password hash

  if (!passwordCorrect) {
    return response.status(401).send({error: [{
      field: 'password',
      message: 'incorrect password'
    }] });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };


  const token = jwt.sign(userForToken, process.env.SECRET); //signing token and returning it for storing in the browser

  response
    .status(200)
    .send({ token, username: user.username, id: user.id});
});

module.exports = loginRouter;