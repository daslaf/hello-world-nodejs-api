const routeHandler = {};

routeHandler.hello = (data, callback) => {
  if (data.method === 'POST') {
    callback(200, {
      message: 'Hey, what\'s good in Baltimore? Nothing!',
    });
  } else {
    callback(200);
  }
};

routeHandler.notFound = (data, callback) => {
  callback(404);
}

module.exports = routeHandler;
