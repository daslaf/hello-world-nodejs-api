const routeHandler = {};

routeHandler.hello = (data, callback) => {
  callback(200, {
    message: 'Hey, what\'s good in Baltimore? Nothing!',
  });
};

routeHandler.notFound = (data, callback) => {
  callback(404);
}

module.exports = routeHandler;
