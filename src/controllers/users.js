const userRouter = require('express').Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const getTokenFrom = require('../utils/getTokenFrom');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const sequelize = require('../db');


// create user / sign up route
userRouter.post('/', async (request, response, next) => {
  const saltRounds = 10;
  const body = request.body;

  // check if a user with this username already exists
  const User = await models.user.findOne({
    where: {
      username: body.username
    }
  });

  //returning errors with field information to update
  //formik form and display errors in the fields
  if (User) {
    return response.status(500).send({error: [{
      field: 'username',
      message: 'username already exists'
    }] });
  }

  // return error if password is short
  if ((body.password).length < 7) {
    return response.status(500).send({error: [{
      field: 'password',
      message: 'password should be atleast 8 characters long'
    }] });
  }
  
  // return error if passwords do not match
  if (body.password != body.passwordConfirm) {
    return response.status(500).send({error: [{
      field: 'password',
      message: 'passwords do not match'
    }, 
    {
      field: 'passwordConfirm',
      message: 'passwords do not match'
    }]});
  }
  try{
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    const User = await models.user.create({ username: body.username, password_hash: passwordHash });
    response.status(200).json(User);
  } catch(err) {
    next(err);
  }
  
});

userRouter.get('/:id', async (request, response) => {
  const User = await models.user.findOne({ 
    where: {id: request.params.id},
  });

  console.log(User);

  return response.status(200).json(User);
});

userRouter.get('/', async (request,response, next) => {
  const token = getTokenFrom(request);
  try{
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if(!token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'});
    }

    const result = await sequelize.query(`
    select u.id, u.username, u."createdAt", u."updatedAt", u.name,
    array_agg(
      json_build_object(
        'id', p.id,
        'content', p.content,
        'creator', json_build_object('id',u.id,'username',u.username),
        'likeStatus', (select value from likes where "userId" = ? and "postId" = p.id),
        'bookmarkStatus', (select cast("userId" as BOOLEAN) from bookmarks where "userId" = ? and "postId" = p.id)
        )
      order by p."createdAt" DESC
      ) posts
    from users u inner join posts p on u.id = p."userId"
    where u.id = ?
    group by u.id
    `, { replacements: [decodedToken.id, decodedToken.id, decodedToken.id],type: Sequelize.QueryTypes.SELECT});

    const likedPosts = await sequelize.query(`
    select p.*,
    json_build_object('id',u.id,'username',u.username) creator, 
    (select value from likes where "userId" = ? and "postId" = p.id) "likeStatus",
    (select cast("userId" as BOOLEAN) from bookmarks where "userId" = ? and "postId" = p.id) "bookmarkStatus"
    from posts p inner join likes l on l."postId" = p.id and l."userId" = ?
    inner join users u on u.id = p."userId"
    `, { replacements: [decodedToken.id, decodedToken.id, decodedToken.id],type: Sequelize.QueryTypes.SELECT});


    console.log(result);

    return response.json({
      ...result[0],
      likedPosts
    });
  } catch(error) {
    next(error);
  }

  return response.status(200).json();  
});

userRouter.get('/handle/:handle', async (request,response) => {
  const User = await models.user.findOne({ 
    where: {username: request.params.handle}, 
    include: [
      {model: models.post, as:'created_posts', include:[{model: models.user, as:'creator'},{model: models.user, as:'likers'}]},
      {model: models.post, as:'liked_posts', include:[{model: models.user, as:'creator'},{model: models.user, as:'likers'}]},
      {model: models.post, as:'bookmarked_posts', include:[{model: models.user, as:'creator'},{model: models.user, as:'likers'}]},
    ]
  });

  return response.status(200).json(User);  
});


userRouter.get('/:id/clearBookmarks', async (request,response) => {
  await models.bookmarks.destroy({where: {user_id: request.params.id}});
  response.status(200).json({
    status:'success'
  });
});



userRouter.delete('removeBookmark/:id', async (request,response) => {
  const Bookmark = await models.bookmarks.destroy({where: {user_id: request.params.id, post_id: request.params.postID}});
  return response.status(200);

});

module.exports = userRouter;