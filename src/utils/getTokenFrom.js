const getTokenFrom = request => {
  const authorization = request.get('Authorization');
  if(authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7);
  }
  return null;
};

module.exports = getTokenFrom;