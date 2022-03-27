import express from 'express';
import path from 'path';

const app = express();

const root = path.join(__dirname, '../..');

//the use function, which runs a series of commands when a given path matches. 
//When executing this function without a path, it is executed for every request.
app.use('/', express.static(path.join(root, 'dist/client')));
app.use('/uploads', express.static(path.join(root, 'uploads')));

app.get('/', function (req, res) {
  res.sendFile(path.join(root, '/dist/client/index.html'));
});

app.listen(8000, () => console.log('Listening on port 8000!'));
