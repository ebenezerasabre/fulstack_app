

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes');


const app = express();

app.use(bodyParser.json());

// Routes
app.use('/api', routes);


app.post('/', (req, res) => {
  res.send('Hello, world');
});


const { port } = require('./src/config/server.config');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
