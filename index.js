const http  = require('http');
const url   = require('url');
const { StringDecoder } = require('string_decoder');

const routeHandler = require('./route-handler');

const PORT = process.env.PORT;

const server = http.createServer(serverConstructor);

server.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

const router = {
  'hello': routeHandler.hello,
};

function serverConstructor(req, res) {
  // get the request path and the query string
  const { pathname, query } = url.parse(req.url);
  const trimmedPath = pathname.replace(/^\/+|\/+$/g, '');

  // get the request headers & method
  const { headers, method } = req;

  // get the payload if any
  const decoder = new StringDecoder('utf-8');
  let payload = '';

  // Listen to the data event and append the decoded buffered data to the
  // payload string on every emission.
  req.on('data', (data) => {
    payload += decoder.write(data);
  })

  // `end` is always called whether a body was sent in the request or not,
  // so it's safe to send the response here.
  req.on('end', () => {
    payload += decoder.end();

    const handler = trimmedPath in router
      ? router[trimmedPath]
      : routeHandler.notFound;

    const data = {
      headers,
      method,
      payload,
      query,
      path: trimmedPath,
    };

    // Set status code and payload defaults just in case
    handler(data, (statusCode = 200, payload = {}) => {
      const payloadString = JSON.stringify(payload);

      // Send the response
      res.setHeader('Content-Type', 'application-json');
      res.writeHead(statusCode);
      res.end(payloadString);

      console.log('Returning response: ', statusCode, payloadString);
    });
  });
}
