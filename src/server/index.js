import express from 'express';
import path from 'path';
import helmet from 'helmet'; // Helmet is a tool that allows you to set various HTTP headers to help secure your application.
import cors from 'cors';
import compress from 'compression';
import services from './services';

const app = express();

const root = path.join(__dirname, '../..');

//the use function, which runs a series of commands when a given path matches.
//When executing this function without a path, it is executed for every request.
app.use('/', express.static(path.join(root, 'dist/client')));
app.use('/uploads', express.static(path.join(root, 'uploads')));
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', '*.amazonaws.com'],
    },
  })
);
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(compress()); // This middleware compresses all the responses going through it. Remember to add it very high in your routing order so that all the requests are affected.
app.use(cors()); // Allows cross-origin resource sharing (CORS) requests

const serviceNames = Object.keys(services);
for (let i = 0; i < serviceNames.length; i += 1) {
  const name = serviceNames[i];
  if (name === 'graphql') {
    (async () => {
      await services[name].start();
      services[name].applyMiddleware({ app });
    })();
  } else {
    app.use('/${name}', services[name]); 
  }
}

app.get('/', function (req, res) {
  res.sendFile(path.join(root, '/dist/client/index.html'));
});

app.listen(8000, () => console.log('Listening on port 8000!'));
